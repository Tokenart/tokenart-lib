const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')

module.exports = [
  {
    target: 'web',
    mode: 'production',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new NodePolyfillPlugin(),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'browser.js',
      library: {
        name: 'TokenArt',
        type: 'umd'
      }
    },
  },
  {
    target: 'node',
    mode: 'production',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'commonjs.js',
      library: {
        type: 'commonjs'
      },
    },
  },
]
