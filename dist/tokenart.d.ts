declare module "config" {
    const _default: {
        CLIENT_RPC_ENDPOINT: any;
        TOKENART_CONTRACT_ADDRESS: string;
        TEZOS_API_SUBDOMAIN: string;
        TEZOS_LICENSES_MAP: string;
        TEZOS_LICENSELINKS_MAP: string;
        TEZOS_CONTRACTLICENSES_MAP: string;
        TEZOS_TOKENLICENSES_MAP: string;
    };
    export default _default;
}
declare module "EthereumApi" {
    module "web3-eth-abi" {
        const encodeFunctionCall: any, decodeParameters: any;
    }
    module "axios" {
        const create: any;
    }
    export function fetchContractLicense(address: string): Promise<{
        license: string;
        link: string;
    }>;
    export function fetchTokenLicense(address: string, tokenId: string): Promise<{
        license: string;
        link: string;
    }>;
}
declare module "TezosApi" {
    module "axios" {
        const get: any;
    }
    export function loadTezosLicenses(): void;
    export function fetchTezosContractLicense(address: string): Promise<{
        license: string;
        link: string;
    }>;
    export function fetchTezosTokenLicense(address: string, tokenId: string): Promise<{
        license: string;
        link: string;
    }>;
}
declare module "svg/erc1155-icon" {
    export default function ERC1155Icon({ color, props }: {
        color?: string;
        props: any;
    }): string;
}
declare module "svg/erc721-icon" {
    export default function ERC721Icon({ color, props }: {
        color: any;
        props: any;
    }): string;
}
declare module "svg/no-license-icon" {
    export default function NoLicenseIcon({ color, props }: {
        color: any;
        props: any;
    }): string;
}
declare module "svg/public-domain-icon" {
    export default function PublicDomainIcon({ color, props }: {
        color: any;
        props: any;
    }): string;
}
declare module "svg/attribution-icon" {
    export default function AttributionIcon({ color, props }: {
        color: any;
        props: any;
    }): string;
}
declare module "svg/share-alike-icon" {
    export default function ShareAlikeIcon({ color, props }: {
        color: any;
        props: any;
    }): string;
}
declare module "icons" {
    type Icon = {
        name: string;
        tag?: string;
        description: string;
    };
    export const iconSet: Icon[];
    export function getIcons(license: string, tokenStandard?: 'ERC721' | 'ERC1155'): {
        icons: {
            element: string;
            name: string;
            tag?: string;
            description: string;
        }[];
        warning: string;
    };
    export function getIconElement(icon: Icon): string;
}
declare module "index" {
    export function initialize(_config: {
        CLIENT_RPC_ENDPOINT: string;
    }): void;
    export function getLicense(address: string, tokenId: string, tokenStandard?: Promise<'ERC721' | 'ERC1155'>): Promise<{
        license: string;
        link: string;
        warning: string;
        icons: {
            element: string;
            name: string;
            tag?: string;
            description: string;
        }[];
    }>;
}
