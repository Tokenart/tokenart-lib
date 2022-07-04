const TokenArt = require('tokenart')
console.log(TokenArt)

TokenArt.initialize({CLIENT_RPC_ENDPOINT: 'https://eth-rinkeby.alchemyapi.io/v2/xkDRPhp2kMajTxIsx38G6F7WA-AeKehL', TOKENART_CONTRACT_ADDRESS: '0x2187af7DB27787834e7E3c47b8BA38E0E8a78463'})
TokenArt.getLicense('0x06012c8cf97BEaD5deAe237070F9587f8E7A266d', 0, 'ERC721').then(a => console.log('License:', a))
