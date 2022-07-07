# tokenart-lib

TokenArt registers on-chain the licenses of NFTs.

TokenArt library enables your dapp to communicate with the TokenArt registry, in a decentralized fashion!
Your dapp can use the TokenArt license set to display license information to your users, like on https://tokenart.app !

Works for NFTs on Ethereum, Polygon, Tezos.

### How to test:

Run `npm run build`, then see instructions in `demo`.

## Prerequisite: Create an Infura RPC Endpoint

The TokenArt library communicate directly with the Polygon blockchain (where the on-chain TokenArt registry is located).
You need to provide an RPC endpoint.
You can use the Infura provider ([see the tutorial](https://blog.infura.io/post/getting-started-with-infura-28e41844cc89)).

Be carefull: The RPC endpoint is going to be called from client side.
Make sure to generate a secure, restricted endpoint!

*How to secure my Infura endpoint?*

1. Go to https://infura.io/dashboard . Create a new project. Select 'Product: Ethereum'. Give it a special name, eg. 'TokenArt Polygon Secured Client'.

2. Go to your project's settings. Select 'Endpoints: Polygon Mainnet'. Disable 'Infura Transactions' (the lib need read-only rights).

3. Go to the 'Security' tab. Skip the JWT part. You can restrict the number of request per second / per day so you don't exceed your Infura limits. Fill 'Contract Addresses: 0x735bd83c5683953599B58E247535BD281477e7B8', the address of the on-chain TokenArt registry. Fill 'Origins' with the domain name of your dapp, eg. 'tokenart.app'. Fill 'API REQUEST METHOD: eth_call', the only method used by the library.

You're good! Take your endpoint address (in the form of: `https://polygon-mainnet.infura.io/v3/...`), add it to your environment variable and use it to initialize the library.

## How to use in browser:

1. Install: `npm i tokenart`
Import the file `<script src="node_modules/tokenart/dist/browser.js"></script>`.

Alternatively, download the file `dist/browser.js` in your dependency folder.

2. Call `TokenArt.initialize({CLIENT_RPC_ENDPOINT})` at page loading.
This will download initial data from Tezos.
Follow the prerequite instructions to have a RPC endpoint on the Polygon network.

Be carefull: CLIENT_RPC_ENDPOINT is going to be called from client side, make sure to generate a restricted endpoint.

3. Call `TokenArt.getLicense(address, tokenId, tokenStandard)` to retrieve the license of a token!
Check the *API* section below for more detail on how to use the methods.

## How to use in a React app:

Be carefull: CLIENT_RPC_ENDPOINT is going to be called from client side, make sure to generate a restricted endpoint.

1. Install: `npm i tokenart`

2. Use `useEffect(effect, [])` to initialize once at app start!

```ts
// file: app.tsx
import { initialize } from 'tokenart'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => initialize({
    CLIENT_RPC_ENDPOINT: process.env.NEXT_PUBLIC_CLIENT_RPC_ENDPOINT,
  }), [])

  return (
    // ...
  )
}

export default MyApp
```

3. Retrieve the license of a token and display the icon set

```tsx
import { getLicense } from "tokenart"

const address = // ...
const tokenId = // ...
const tokenStandardRequest = collectionDataRequest.then(({ tokenStandard }) => tokenStandard) // If request for tokenStandard is flighting
const tokenStandardRequest = tokenStandard // If you already know tokenStandard

const { license, link, warning, icons } = await getLicense(address, tokenId, tokenStandardRequest)

// in your jsx
return (
    <div>
        <p>License: <a href={link}>{ license }</a> {warning && <i style="color: red;">({warning})</i>}</p>

        { icons.map((icon, j) => (<div dangerouslySetInnerHTML={{__html: icon.element}} title={icon.description} key={j} />)) }
    </div>
)
```

Check the *API* section below for more detail on how to use the methods.

## How to use in a Node script:

1. Install: `npm i tokenart`

2. Use the library:

```js
const TokenArt = require('tokenart')

// This will download initial data from Tezos.
// Follow the prerequite instructions to have a RPC endpoint on the Polygon network.
// We advice to put CLIENT_RPC_ENDPOINT in your environment variables.
TokenArt.initialize({CLIENT_RPC_ENDPOINT})

// Check the API section for more detail on how to use the method.
const license = await TokenArt.getLicense(address, tokenId, tokenStandard)
```

Check the *API* section below for more detail on how to use the methods.

## API

Look at `src/index.ts` for more information! Don't hesitate to ask any question on Discord!

### `initialize`

```ts
function initialize(config: {
    CLIENT_RPC_ENDPOINT: string;
}): void
```

*What it does*

1. It saves the configuration for later use.

2. It loads initial data from Tezos, using the https://tzstats.com/ service.

*How to use*

Call this method once at page start, before calling getLicense.

You don't need to wait for it, that's why it doesn't return any promise!
You can do your own jobs, call `getLicense`, ... `getLicense` will wait automatically for Tezos to be initialized if needed.

*Advanced usage*

It is possible to provide more configuration if you need to talk to non-official TokenArt registries:

```ts
config: {
    CLIENT_RPC_ENDPOINT: null, // Should match TOKENART_CONTRACT_ADDRESS network
    TOKENART_CONTRACT_ADDRESS: '0x735bd83c5683953599B58E247535BD281477e7B8', // Polygon
    TEZOS_API_SUBDOMAIN: '.ithaca',
    TEZOS_LICENSES_MAP: '98560',
    TEZOS_LICENSELINKS_MAP: '98562',
    TEZOS_CONTRACTLICENSES_MAP: '98564',
    TEZOS_TOKENLICENSES_MAP: '98563',
}
```

### `getLicense`

```ts
function getLicense(address: string, tokenId: string, tokenStandard?: Promise<'ERC721' | 'ERC1155'>): Promise<{
    license: string;
    link: string;
    warning: string;
    icons: {
        element: string;
        name: string;
        tag?: string;
        description: string;
    }[];
}>
```

*What is does*

1. It looks for the network the NFT belongs to (Ethereum, Polygon or Tezos).

2. It concurrently fetches the token and contract's licenses from the TokenArt registry (using the Polygon RPC endpoint or Tezos preloaded data). It uses the token registered license or defaults to the contract license.

3. It computes icons for that license, waiting for the tokenStandard to be available if needed.

*How to use*

Call this method once per token. Example for a CryptoKitty:
```js
await getLicense('0x06012c8cf97bead5deae237070f9587f8e7a266d', '2012947', 'ERC721')
```

Returns:
* The license name: you can display to the user, for instance in the NFT's detail section.
* The license link: the official, direct link to the license. For instance, can be a link over the license name.
* The warning: some license are centralized. You should display this warning to inform the user on issues that can exist on the license. For instance, display small, red.
* The icons: the official TokenArt icons related to that license. Gives you:
    - an HTML element to display,
    - a description explaining the meaning that you can display for instance in a tooltip.
    - As well, the name and tag of the icon (not very informative).

Loop over the icons to display to your users, with a tooltip!

*Advanced usage*

`tokenStandard` can be omitted if you don't want the icon.

## Need new support, new features?

Open a ticket or message TokenArt founders on Discord!
