const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;

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
              [ '@babel/env', { targets: { browsers: [ 'last 2 versions' ] }, useBuiltIns: 'usage', corejs: 3, modules: false } ],
              '@babel/react'
            ],
            plugins: [
              [ '@babel/transform-runtime', { corejs: 3 } ],
              [ '@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          }
        },
        {
          test: /\.css$/,
          use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
        },
        {
          test: /\.less$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'less-loader',
              options: {
                lessOptions: {
                  paths: [ path.resolve(__dirname, 'node_modules') ]
                }
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
      new DefinePlugin({
        'TIMEZONE_URL': JSON.stringify('https://bruga-time-zone.herokuapp.com/timezone')
      }),
      new MiniCssExtractPlugin({
        filename: "styles/bundle.css?[hash]"
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
        meta: {
          viewport: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
          description: 'Simple weather app made with <3 by Andrés Brugarolas'
        },
        inject: true
      }),
      new FaviconsWebpackPlugin('./src/assets/logo.png')
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
