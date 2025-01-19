const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // Environment variable for the production domain

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // Naming convention for production files
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean output directory before each build
    publicPath: '/menu/latest/', // Specify public path for production
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'menu', // Name of the app
      remotes: {
        // Define remote modules for production
      },
      shared: packageJson.dependencies, // Share dependencies
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
