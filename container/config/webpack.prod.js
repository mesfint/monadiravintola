const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // Environment variable for the production domain

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // Naming convention for production files
    publicPath: '/container/latest/', // Public path for hosted assets
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // Name of the container app
      remotes: {
        //marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, // Remote module in production
      },
      shared: packageJson.dependencies, // Share dependencies
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
