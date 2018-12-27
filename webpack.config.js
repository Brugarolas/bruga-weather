const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const RemoteFilePlugin = require('remote-file-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['minify', { builtIns: false } ],
            [ '@babel/env', { 'targets': { 'browsers': [ 'last 2 versions' ] }, 'modules': false } ],
            '@babel/react'
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { 'loose': true }]
          ]
        }
      },
      {
        test: /\.css/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              paths: [ path.resolve(__dirname, 'node_modules') ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'img'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/logo.png',
      inject: false
    }),
    new RemoteFilePlugin([
      {
        url: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Roboto:100,300,400,500,700,900',
        filepath: 'styles/fonts.css',
        cache: true
      },
    ])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.jsx', '.json']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};
