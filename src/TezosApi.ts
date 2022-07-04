// https://api.ithaca.tzstats.com/explorer/contract/KT1Jh9jDxqZnXmpdiuLZu9dcBEbcQgw32xsK/storage
import axios from "axios";
import config from './config';

declare module "axios" {
    const {get};
}

let licensesById: Promise<{ id: string, name: string, link: string }[]>;
let contractLicenses: Promise<{ address: string, name: string, link: string }[]>;
let tokenLicenses: Promise<{ address: string, id: string, name: string, link: string }[]>;

export function loadTezosLicenses() {
    if (licensesById) return;
    
    licensesById = loadLicensesById();
    contractLicenses = loadContractLicenses();
    tokenLicenses = loadTokenLicenses();

    licensesById.then(licenses => console.log('licensesById', licenses));
    contractLicenses.then(licenses => console.log('contractLicenses', licenses));
    tokenLicenses.then(licenses => console.log('tokenLicenses', licenses));
}

async function loadLicensesById() {
    let resLicenses;
    try {
        resLicenses = await axios.get(`https://api${config.TEZOS_API_SUBDOMAIN}.tzstats.com/explorer/bigmap/${config.TEZOS_LICENSES_MAP}/values`);
    } catch (err) {
        console.error(err);
    }

    if (!resLicenses) return;

    let resLicensesLinks;
    try {
        resLicensesLinks = await axios.get(`https://api${config.TEZOS_API_SUBDOMAIN}.tzstats.com/explorer/bigmap/${config.TEZOS_LICENSELINKS_MAP}/values`);
    } catch (err) {
        console.error(err);
    }

    let licenseLinks;
    if (!resLicensesLinks) {
        licenseLinks = [];
    } else {
        licenseLinks = resLicensesLinks.data;
    }

    return resLicenses.data.map(license => {
        const id = license.key;
        const name = license.value;
        const link = licenseLinks.find(licenseLink => licenseLink.key['0'] === id) ?? '';
        
        return { id, name, link };
    });
}

async function loadContractLicenses() {
    if (!licensesById) throw 'TokenArt.lib: Please call initialLoading() at start.';
    const _licensesById = await licensesById;
    
    let resContractLicense;
    try {
        resContractLicense = await axios.get(`https://api${config.TEZOS_API_SUBDOMAIN}.tzstats.com/explorer/bigmap/${config.TEZOS_CONTRACTLICENSES_MAP}/values`);
    } catch (err) {
        console.error(err);
    }

    if (!resContractLicense) return;

    return resContractLicense.data.map(contractLicense => {
        const address = contractLicense.key;
        const licenseById = _licensesById.find(license => license.id === contractLicense.value.clLicenseId);
        const name = licenseById ? licenseById.name : '';
        const link = licenseById ? licenseById.link : ''; 

        return { address, name, link };
    });
}

async function loadTokenLicenses() {
    if (!licensesById) throw 'TokenArt.lib: Please call initialLoading() at start.';
    const _licensesById = await licensesById;

    let resTokenLicense;
    try {
        resTokenLicense = await axios.get(`https://api${config.TEZOS_API_SUBDOMAIN}.tzstats.com/explorer/bigmap/${config.TEZOS_TOKENLICENSES_MAP}/values`);
    } catch (err) {
        console.error(err);
    }

    if (!resTokenLicense) return;

    return resTokenLicense.data.map(tokenLicense => {
        const address = tokenLicense.key['0'];
        const id = tokenLicense.key['1'];
        const licenseById = _licensesById.find(license => license.id === tokenLicense.value.clLicenseId);
        const name = licenseById ? licenseById.name : '';
        const link = licenseById ? licenseById.link : ''; 

        return { address, id, name, link };
    });
}

export async function fetchTezosContractLicense(address: string): Promise<{ license: string, link: string }> {
    if (!contractLicenses) throw 'TokenArt.lib: Please call initialLoading() at start.';

    const contractLicense = (await contractLicenses).find(license => license.address === address);

    return {
        license: contractLicense?.name ?? '',
        link: contractLicense?.link ?? '',
    }
}

export async function fetchTezosTokenLicense(address: string, tokenId: string): Promise<{ license: string, link: string }> {
    if (!tokenLicenses) throw 'TokenArt.lib: Please call initialize() at start.';

    const tokenLicense = (await tokenLicenses).find(token => token.address === address && token.id === tokenId);

    return {
        license: tokenLicense?.name ?? '',
        link: tokenLicense?.link ?? '',
    }
}
