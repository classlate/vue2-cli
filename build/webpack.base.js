const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/chunk-[contenthash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),
  ],
  module: {
    rules: [
      // test: /\.(css|less|s[cs]ss)$/,
      {
        test: /\.(css|less|s[cs]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      // test: /\.(png|jpe?g|svg|webp)$/,
      {
        test: /\.(png|jpe?g|svg|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      // test: /\.js$/,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'cache-loader',
          'thread-loader',
          'babel-loader',
        ],
      },
      // test: /\.vue$/,
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': './src',
    },
    extensions: ['.js', '.ts', '.less', '.vue'],
  },
}
