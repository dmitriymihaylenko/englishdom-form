const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const vendorsPath = (plugin) => path.resolve(__dirname, `./public/vendor-js/${plugin}`);

module.exports = {
  devtool: 'source-map',

  devServer: {
    port: 3000,
    host: 'localhost',
  },

  entry: {
    'form-logic': path.resolve(__dirname, './src/modules/form-logic.js'),
    'form-logic.min': path.resolve(__dirname, './src/modules/form-logic.js'),
  },

  output: {
    publicPath: path.join(__dirname, './'),
    path: path.resolve(__dirname, './public/bundles/js'),
    filename: '[name].js',
  },

  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: /\.min\.js$/,
      sourceMap: true,
    })],
  },

  resolve: {
    // modules: ['<%= project.modules %>', '<%= project.vendor %>'],

    alias: {
      logic: vendorsPath('form-logic/form-logic'),
      jquery: vendorsPath('jquery/dist/jquery'),
      underscore: vendorsPath('underscore/underscore'),
      'input-tel': vendorsPath('intl-tel-input/build/js/intlTelInput'),
      'babel-polyfill': vendorsPath('babel-polyfill/dist/polyfill'),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          "presets": [
            [
              "@babel/preset-env",
              { "modules": "commonjs" }
            ],
          ],
          "plugins": [
            '@babel/plugin-transform-object-assign',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-runtime'
          ]
        }
      }
    ]
  },
};
