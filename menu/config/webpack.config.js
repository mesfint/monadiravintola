const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

// Load .env before anything else
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Set default NODE_ENV if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Now use these in your config
const isDevelopment = process.env.NODE_ENV !== 'production';

const packageJson = require('../package.json');
//Get container url
const getContainerUrl = () => {
  if (isDevelopment) {
    return process.env.DEV_CONTAINER;
  }
  return process.env.PROD_CONTAINER;
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
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
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
      'process.env.CONTAINER_URL': JSON.stringify(process.env.CONTAINER_URL),
    }),
    new ModuleFederationPlugin({
      name: 'menu',
      filename: 'remoteEntry.js',
      
      remotes: {
        container: `container@http://localhost:3000/remoteEntry.js?t=${Date.now()}`, 
  
       },
      exposes: {
        './Hero': './src/components/hero/Hero.tsx', 
        './Menu': './src/components/menu/Menu.tsx', 
        './MenuContext': './src/context/MenuContext.tsx',
        './types': './src/types/index.ts',
        
        
        
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
        "@mui/material": { 
          singleton: true,
          requiredVersion: packageJson.dependencies["@mui/material"],
        },
        "@mui/icons-material": { 
          singleton: true,
          requiredVersion: packageJson.dependencies["@mui/icons-material"],
        },
        


      },

      
    
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
  ],
};
