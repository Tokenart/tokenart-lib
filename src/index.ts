import { fetchContractLicense, fetchTokenLicense } from "./EthereumApi"
import { loadTezosLicenses, fetchTezosContractLicense, fetchTezosTokenLicense } from "./TezosApi"
import { getIcons } from './icons'
import config from './config'

export function initialize(_config: { CLIENT_RPC_ENDPOINT: string }) {
    for (const key in _config) {
        config[key] = _config[key]
    }
    loadTezosLicenses()
}

export async function getLicense(address: string, tokenId: string, tokenStandard?: Promise<'ERC721'|'ERC1155'>) {
    if (!config.CLIENT_RPC_ENDPOINT) throw 'Please initialize TokenArt.lib with CLIENT_RPC_ENDPOINT'

    // 1. Validate address

    let isEthereum;

    if (address.startsWith('0x')) {
        if (address.length !== 42) throw `TokenArt.lib: ${address} is not a valid Ethereum address.`
        isEthereum = true
    }
    else if (address.startsWith('tz') || address.startsWith('KT')) {
        if (address.length !== 36) throw `TokenArt.lib: ${address} is not a valid Tezos address.`
        isEthereum = false
    }
    else {
        throw 'TokenArt.lib: ${address} is not an Ethereum or Tezos address.'
    }

    // 2. Fetch license from the blockchain

    // Fetch concurrently for token and contract
    const tokenRequest = (isEthereum ? fetchTokenLicense : fetchTezosTokenLicense)(address, tokenId)
    const contractRequest = (isEthereum ? fetchContractLicense : fetchTezosContractLicense)(address)

    let data = await tokenRequest

    if (!data.license) {
        data = await contractRequest
    }

    const { license, link } = data

    // 3. Compute icons

    let { icons, warning } = getIcons(license, await tokenStandard)

    return { license, link, warning, icons }
}
