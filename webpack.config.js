/*eslint-disable */
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: "production",
  output: {
    filename: 'switcher.min.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
    }),

  ],
    module:
    {
      rules: [
        {
          test: /\.js$/,
          exclude: /\/node_modules\//,
          loader: 'babel-loader',
        },
      ],
    },
};
