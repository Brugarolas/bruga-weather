const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const RemoteFilePlugin = require('remote-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';

  const isAnalyzer = isProduction && args.analyzer;

  const publicPath = isProduction ? '/' + (args.publicPath ? args.publicPath + '/' : '') : '/';

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
          exclude: /(fa-.+\.svg)$/, /* Font Awesome */
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            outputPath: 'img'
          }
        },
        {
          test: [ /\.(woff|woff2|ttf|eot)$/, /(fa-.+\.svg)$/ ],
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
      new webpack.DefinePlugin({
        'TIMEZONE_URL': JSON.stringify('https://brugarolas.openode.io/timezone')
      }),
      new RemoteFilePlugin([
        {
          url: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Roboto:100,300,400,500,700,900',
          filepath: 'styles/fonts.css',
          cache: true
        },
      ]),
      new MiniCssExtractPlugin({
        filename: "styles/bundle.css?[hash]"
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
        favicon: './src/assets/logo.png',
        meta: {
          viewport: 'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no'
        },
        inject: true
      }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ['styles/fonts.css'],
        resolvePaths: true,
        publicPath: true,
        append: true,
        hash: true
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['*', '.js', '.jsx', '.json']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: publicPath,
      filename: 'js/bundle.js?[hash]'
    },
    devServer: {
      contentBase: './dist'
    }
  };

  if (isProduction) {
    // Add babel-minify preset only in production
    const babelRules = config.module.rules.find(rule => rule.loader === 'babel-loader');
    babelRules.options.presets.unshift(['minify', { builtIns: true } ]);
  }

  if (isAnalyzer) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
}
