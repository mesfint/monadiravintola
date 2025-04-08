const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getContainerUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return 'container@http://localhost:3000/remoteEntry.js';
  }
  return process.env.CONTAINER_URL;
};

module.exports = {
  entry: './src/main.tsx',
  mode: 'development',
  devServer: {
    port: 3002,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.json$/,
        type: "json" // Built-in JSON loader for Webpack 5
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'booking',
      filename: 'remoteEntry.js',
      remotes: {
        container: getContainerUrl(),
      },
      exposes: {
        './BookingModal': './src/components/BookingModal', 
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        '@mui/material': { singleton: true },
        '@mui/icons-material': { singleton: true },
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true },
        'dayjs': { singleton: true },
      },
        }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
  ],
};
