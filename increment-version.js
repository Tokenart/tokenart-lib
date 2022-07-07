const manifest = require('./package.json')
const newVersion = manifest.version.split('.').slice(0, -1).concat([parseInt(manifest.version.split('.').slice(-1)[0]) + 1]).join('.')
require('fs').writeFile('./package.json', JSON.stringify({...manifest, version: newVersion}, null, 2), null, () => console.log('Version:', newVersion))
