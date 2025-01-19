const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081, // Port for the app
    historyApiFallback: {
      index: '/index.html', // Serve index.html for SPA routes
    },
    static: {
      directory: './dist', // Serve static files from the output directory
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'menu',
      filename: 'remoteEntry.js',
      exposes: {
        './MenuApp': './src/bootstrap', // Expose module
      },
      shared: packageJson.dependencies, // Share all dependencies
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
