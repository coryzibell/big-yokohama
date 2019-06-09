const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const glob = require('glob')
const child_process = require('child_process')
const config = require('./config')
const vendor = './js/vendor'
const app = './js/app'

const bundleJs = glob.sync('./components/*(shared|ui)/**/index.js')

module.exports = {
  mode: 'production',
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
            options: { importLoaders: 1, minimize: true }
          },
          'postcss-loader'
        ])
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {}
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].pcss'),
    new CleanWebpackPlugin([path.join(__dirname, config.paths.dist)], {
      root: process.cwd()
    })
  ]
}
