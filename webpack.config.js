const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const webpack = require('webpack')
const path = require('path')
require('dotenv').config()

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      serveIndex: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'catalogue',
      filename: 'remoteEntry.js',
      exposes: {
        './CatalogueApp': './src/CatalogueApp',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_PC_API': JSON.stringify(process.env.REACT_APP_PC_API),
      'process.env.REACT_APP_PC_FE': JSON.stringify(process.env.REACT_APP_PC_FE),
    }),
  ],
}
