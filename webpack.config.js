const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'ng1-html5-dnd',
    libraryTarget: 'window',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        },
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ng-annotate-loader' },
          { loader: 'babel-loader' },
        ],
      },
    ],
  },
  externals: {
    angular: 'angular',
  },
};
