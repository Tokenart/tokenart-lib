const TokenArt = require('tokenart')
console.log(TokenArt)

TokenArt.initialize({CLIENT_RPC_ENDPOINT: 'https://polygon-mainnet.infura.io/v3/daa21114d62c4a55bb148bc51d4cdb55'})
TokenArt.getLicense('0x06012c8cf97bead5deae237070f9587f8e7a266d', '2012947', 'ERC721').then(l => console.log('License:', l))
