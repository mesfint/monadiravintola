const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
//require("dotenv").config('../.env');
dotenv.config({ path: path.resolve(__dirname, '../.env') });


//Load env
dotenv.config();
const packageJson = require('../package.json');

const isDevelopment = process.env.NODE_ENV !== 'production';
//Get container url
const getContainerUrl = () => {
  if (isDevelopment) {
    return process.env.DEV_CONTAINER;
  }
  return process.env.CONTAINER_URL || 'container@http://localhost:3000/remoteEntry.js';
};

module.exports = {
  entry: './src/main.tsx',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: isDevelopment ? 'auto' : '/menu/',
    clean: true,
  },
  devServer: isDevelopment ? {
    port: process.env.PORT || 3001,
    historyApiFallback: true,
    hot: true,
  } : undefined,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PORT': JSON.stringify(process.env.PORT),
    }),
    new ModuleFederationPlugin({
      name: 'menu',
      filename: 'remoteEntry.js',
      exposes: {
        './Hero': './src/components/hero/Hero.tsx', 
        './Menu': './src/components/menu/Menu.tsx', 
        
      },
      remotes: {
        container: getContainerUrl(),
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
