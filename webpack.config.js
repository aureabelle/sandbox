const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  devServer: {
    port: 3000,
    host: '127.0.0.1'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }]
  }
};