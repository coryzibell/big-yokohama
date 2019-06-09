const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = new (require('dotenv-webpack'))()
const path = require('path')
const glob = require('glob')
const child_process = require('child_process')
const config = require('./config')
const vendor = require('./js/vendor')
const app = require('./js/app')

let localEnv = Dotenv.definitions['process.env.LOCAL_URL']
localEnv = localEnv.substring(1, localEnv.length - 1)

const bundleJs = glob.sync('./components/*(shared|ui)/**/index.js')

module.exports = {
  mode: 'development',
  entry: {
    bundle: bundleJs,
    style: './css/app.pcss',
    vendor: vendor,
    app: app
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, config.paths.dist),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ])
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].pcss'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new CleanWebpackPlugin([path.join(__dirname, config.paths.dist)], {
      root: process.cwd()
    })
  ]
}
