const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const RemoteFilePlugin = require('remote-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';

  const config = {
    entry: './src/index.js',
    stats: { children: false },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              ['minify', { builtIns: true } ],
              [ '@babel/env', { targets: { browsers: [ 'last 2 versions' ] }, useBuiltIns: 'usage', modules: false } ],
              '@babel/react'
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { 'loose': true }]
            ]
          }
        },
        {
          test: /\.css$/,
          use: [ 'css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader' ]
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'css-hot-loader' },
            { loader: MiniCssExtractPlugin.loader },
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
          test: /\.(woff|woff2|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            outputPath: 'fonts'
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
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: "styles/bundle.css?[hash]"
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
      filename: 'js/bundle.js?[hash]'
    },
    devServer: {
      contentBase: './dist'
    }
  };

  return config;
}
