const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';
  const isAnalyzer = isProduction && args.analyze;
  const publicPath = isProduction ? '/' + (env && env.PUBLIC_PATH ? env.PUBLIC_PATH + '/' : '') : '/';

  const config = {
    entry: './src/index.js',
    mode: 'development',
    stats: {
      assets: true,
      children: false,
      colors: true
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: publicPath,
      filename: 'js/bundle.js?[contenthash]'
    },
    optimization: {
      minimize: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      flagIncludedChunks: true, // https://webpack.js.org/configuration/optimization/#optimizationflagincludedchunks
      providedExports: true,
      usedExports: 'global'
    },
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
              [ '@babel/plugin-proposal-class-properties']
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
          test: /-font\.js/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'webfonts-loader',
              options: {
                publicPath: '/bruga-weather/'
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          exclude: /(fa-.+\.svg)$/, /* Font Awesome */
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[contenthash]',
            outputPath: 'img'
          }
        },
        {
          test: [ /\.(woff|woff2|ttf|eot)$/, /(fa-.+\.svg)$/ ],
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[contenthash]',
            outputPath: 'fonts'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        TIMEZONE_URL: JSON.stringify('https://bruga-time-zone.onrender.com/timezone'),
        PUBLIC_PATH: publicPath
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/bundle.css?[contenthash]'
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
        favicon: './src/assets/logo.png', // TODO Delete when Favicon plugin is supported again
        meta: {
          viewport: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
          description: 'Simple weather app made with <3 by Andrés Brugarolas'
        },
        inject: true
      })
      // TODO new FaviconsWebpackPlugin('./src/assets/logo.png') // Webpack 5 still not supported
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['*', '.js', '.jsx', '.json']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: true,
      port: 8080,
      hot: true,
      open: true,
      allowedHosts: 'all' // for ngrok
    },
    performance: {
      hints: false
    },
    devtool: 'eval-source-map'
  };

  if (isProduction) {
    config.mode = 'production';
    config.devtool = false;

    console.log('publicPath', publicPath)

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
