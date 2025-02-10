const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


const packageJson = require('../package.json');

module.exports = {
  entry: './src/main.tsx',
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
      name: 'feedback',
      filename: 'remoteEntry.js',
      exposes: {
        './ReviewCarousel': './src/components/ReviewCarousel.tsx',
        './reviewsData': './src/data/reviews.ts',
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
       '@mui/material': { 
        singleton: true,
        requiredVersion: packageJson.dependencies['@mui/material'],
      },
      '@mui/icons-material': { 
        singleton: true,
        requiredVersion: packageJson.dependencies['@mui/icons-material'],
      },
      '@emotion/react': { 
        singleton: true,
        requiredVersion: packageJson.dependencies['@emotion/react'],
      },
      '@emotion/styled': { 
        singleton: true,
        requiredVersion: packageJson.dependencies['@emotion/styled'],
      },
       


     },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
  ],
};
