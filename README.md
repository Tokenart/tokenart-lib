# tokenart-lib

## Build: `npm run build`

## Test: see instructions in `demo`

## Prerequisite: Create an Infura RPC Endpoint



## How to use in browser:

1. Install: `npm i tokenart`
Import the file <script src="node_modules/tokenart/dist/browser.js"></script>

Alternatively, download the file `dist/browser.js` in your dependency folder.

2. Call `TokenArt.initialize({CLIENT_RPC_ENDPOINT})` at page loading.
This will download initial data from Tezos.
Follow the prerequite instructions to have a RPC endpoint on the Polygon network.
Be carefull: CLIENT_RPC_ENDPOINT is going to be called from client side, make sure to generate a restricted endpoint.

3. Call `TokenArt.getLicense(address, tokenId, tokenStandard)` to retrieve the license of a token!
Check the API section for more detail on how to use the method.

## How to use in a React app:

Be carefull: CLIENT_RPC_ENDPOINT is going to be called from client side, make sure to generate a restricted endpoint.

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

## Need new support, new features?

Open a ticket or message TokenArt founders on Discord!
