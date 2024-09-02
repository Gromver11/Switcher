module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'switcher.min.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
      },
    ],
  },
};
