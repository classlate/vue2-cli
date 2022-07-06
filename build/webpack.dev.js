const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const base = require('./webpack.base')

module.exports = merge(
  base,
  {
    mode: 'development',
    devServer: {
      hot: true,
      // port: 8000,
      // open: true,
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_DEV: JSON.stringify('development'),
          },
        },
      }),
      new ESLintPlugin({
        fix: true,
      }),
    ],
  },
)
