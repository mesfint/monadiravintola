const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require("dotenv").config('../.env');
const packageJson = require('../package.json');

module.exports = {
  entry: './src/main.tsx',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: 'babel-loader',
        //loader:'ts-loader',
        
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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'menu',
      filename: 'remoteEntry.js',
      exposes: {
        './Hero': './src/components/hero/Hero.tsx', // Ensure this path is correct
        './Menu': './src/components/menu/Menu.tsx', // Ensure this path is correct
        
      },
      remotes: {
        container: "container@http://localhost:3000/remoteEntry.js",
      },
      shared: {
         react: { singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies.react,
          },
       'react-dom': {
         singleton: true, 
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        
        },
        "@mui/material": "@mui/material", 
        "@mui/icons-material": "@mui/icons-material",
        


      },

      
    
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
  ],
};
