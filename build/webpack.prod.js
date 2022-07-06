const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPluggin = require('compression-webpack-plugin')
const base = require('./webpack.base')

module.exports = merge(
  base,
  {
    mode: 'production',
    devtool: 'nosources-source-map',
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_DEV: JSON.stringify('production'),
          },
        },
      }),
      // new BundleAnalyzerPlugin(),
      new CompressionPluggin({
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  },
)
