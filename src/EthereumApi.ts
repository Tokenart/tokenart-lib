// Alchemy is the library used to talk to the on-chain TokenArt registry
import axios from 'axios';
import * as abiLib from 'web3-eth-abi';
import config from './config';

declare module "web3-eth-abi" {
    const {encodeFunctionCall, decodeParameters};
}
declare module "axios" {
    const {create};
}

export async function fetchContractLicense(address: string) {
    const funcCall: any = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"contractLicenses","outputs":[{"internalType":"uint256","name":"licenseId","type":"uint256"},{"internalType":"uint256","name":"version","type":"uint256"}],"stateMutability":"view","type":"function"};
    const data = abiLib.encodeFunctionCall(funcCall, [address]);

    return fetchLicense(funcCall, data);
}

export async function fetchTokenLicense(address: string, tokenId: string) {
    const funcCall: any = {"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"contractTokenLicenses","outputs":[{"internalType":"uint256","name":"licenseId","type":"uint256"},{"internalType":"uint256","name":"version","type":"uint256"}],"stateMutability":"view","type":"function"};
    const data = abiLib.encodeFunctionCall(funcCall, [address, tokenId]);

    return fetchLicense(funcCall, data);
}


async function fetchLicense(funcCall: any, data: string) {
    const i = await fetchByRpc(data);

    if (!i || !i.data) return { license: '', link: '' };

    const output = abiLib.decodeParameters(funcCall.outputs, i.data.result);
    const { 0: licenseId, 1: licenseVersion } = output;

    if (licenseId === '0') return { license: '', link: '' };

    const licenseFuncCall: any = {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"licenses","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"};
    const licenseData = abiLib.encodeFunctionCall(licenseFuncCall, [licenseId]);

    const licenseLinkFuncCall: any = {"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"licenseLinks","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"};
    const licenseLinkData = abiLib.encodeFunctionCall(licenseLinkFuncCall, [licenseId, licenseVersion]);

    const [j, k] = await Promise.all([
        fetchByRpc(licenseData),
        fetchByRpc(licenseLinkData)
    ]);

    let license = ''
    if (j?.data) {
        const licenseOutput = abiLib.decodeParameters(licenseFuncCall.outputs, j.data.result);
        license = licenseOutput[0];
    }

    let link = ''
    if (k?.data) {
        const licenseLinkOutput = abiLib.decodeParameters(licenseLinkFuncCall.outputs, k.data.result);
        link = licenseLinkOutput[0];
    }

    return { license, link };
}



/*
    The second parameter backoff is for use in purely recursive way.

    If alchemy computation limit is exceeded (429),
    Apply exponential backoff: https://docs.alchemy.com/alchemy/documentation/throughput#option-4-exponential-backoff
*/
async function fetchByRpc(data: string, backoff: number = 0) {
    function exponentialBackoff(backoff) {
        return new Promise((resolve, reject) => {
            if (backoff == 0) return resolve('');
            if (backoff > 64000) return reject('Maximum backoff reached for Alchemy request.');

            const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const random_number_milliseconds = getRandomInt(0, 1000);

            setTimeout(() => resolve(''), backoff + random_number_milliseconds);
        });
    }

    await exponentialBackoff(backoff);

    const http = axios.create({
        baseURL: config.CLIENT_RPC_ENDPOINT,
    });

    try {
        const tokenArtContractAddress = config.TOKENART_CONTRACT_ADDRESS

        return await http.post('', {
            jsonrpc:'2.0',
            method:'eth_call',
            params:[{ to: tokenArtContractAddress, data }, 'latest'],
            id: 1
        });
    } catch (error) {
        if (error?.response?.status == 429) {
            const newBackoff = backoff * 2 || 1;
            console.warn('Reached Alchemy computation limit, retry with backoff ' + newBackoff);
            return fetchByRpc(data, newBackoff);
        }

        throw error;
    }
}
