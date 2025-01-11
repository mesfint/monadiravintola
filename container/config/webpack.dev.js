const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080, // Port for the container app
    historyApiFallback: {
      index: '/index.html', // Serve index.html for SPA routes
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // Name of the container app
      remotes: {
        //menu: 'menu@http://localhost:8081/remoteEntry.js', // Remote module
      },
      shared: packageJson.dependencies, // Share all dependencies
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
