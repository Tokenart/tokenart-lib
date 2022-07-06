# How to test TokenArt lib

## Test it's working in node:

```bash
cd demo
npm i
npm run test
```

You should get:

```
Licenses: {
  license: 'TA-DI-CU',
  link: 'https://goog.le',
  warning: '',
  icons: [
    {
      name: 'ERC721',
      description: 'Single - ERC 721',
      element: [Function (anonymous)]
    },
    {
      name: 'Digital',
      tag: 'DI',
      description: 'This NFT is digital. The NFT holder can personaly use the artwork and do what he can usually do with a NFT. This include the Right to use the NFT Artwork in any smartcontract verifying the proof of ownership.',
      element: [Function (anonymous)]
    },
    {
      name: 'Commercial',
      tag: 'CU',
      description: 'This NFT artwork can be commercially exploited.',
      element: [Function (anonymous)]
    }
  ]
}
```

Go to `src/test.js` for more information on the test.

## Test it's working in browser:

```
cd demo
npm i
serve .
```

Open on the local port.
Data with 3 icons should be displayed. Look in the console for more details.

Go to `index.html` for more information on the test.
