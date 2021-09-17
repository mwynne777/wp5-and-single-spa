const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false
  },

  output: {
    publicPath: 'http://localhost:3006/'
  },

  resolve: {
    extensions: ['.svelte', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            externalDependencies: true,
          },
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'svelty',
      library: { type: 'var', name: 'svelty' },
      filename: 'remoteEntry.js',
      remotes: {
      },
      exposes: {
        comp: './src/app.svelte'
      },
      shared: []
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
};
