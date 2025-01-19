const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
require("dotenv").config('../.env');
const webpack = require("webpack"); // only add this if you don't have yet



module.exports =(env,argv)=>{
  const isProduction = argv.mode === "production";
return {
  entry: './src/main.tsx', // Entry point for the container app
  mode: process.env.NODE_ENV || "development",
  mode: 'development', // Set the mode to development
  devServer: {
    port: 3000, // Port for the container app
    historyApiFallback: true, // Fallback to index.html for SPA
    static: {
      directory: path.join(__dirname, 'dist'), // Serve static files from the output directory
    },
    hot: true, // Enable Hot Module Replacement
  },
  // output: {
  //   filename: '[name].[contenthash].js', // Naming convention for output files
  //   path: path.resolve(__dirname, 'dist'), // Output directory
  //   clean: true, // Clean output directory before each build
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,// Handle TypeScript files
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel for transpilation
      },
      {
        test: /\.css$/, // Handle CSS imports
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // Name of the container app
      filename: 'remoteEntry.js', // Output file for the container app
      remotes: {
        //MenuListHost: 'menu@http://localhost:3001/remoteEntry.js', 
        MenuListHost: isProduction ? process.env.PROD_MENU : process.env.DEV_MENU,
        BookTableHost: isProduction ? process.env.PROD_BOOKING : process.env.DEV_BOOKING,
        FeedbackHost: isProduction ? process.env.PROD_FEEDBACK : process.env.DEV_FEEDBACK,
        //FeedbackHost: 'feedback@http://localhost:3003/remoteEntry.js', 
      },
      shared: {
        react: { singleton: true, eager: true }, // Share React as a singleton
        'react-dom': {
           singleton: true,
            eager: true 
          
          }, // Share ReactDOM as a singleton
      },
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template file
    }),
  ],
};
}
