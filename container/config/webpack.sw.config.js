const path = require('path');

module.exports = {
  entry: './src/service-workers/sw.ts',
  output: {
    filename: 'sw.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  mode: 'development',
  target: 'webworker',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, '../tsconfig.sw.json'),
            transpileOnly: true
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
};
