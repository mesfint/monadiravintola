const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main.tsx', // Entry point for TypeScript app
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
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
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template file
    }),
  ],
  output: {
    filename: '[name].[contenthash].js', // Naming convention for output files
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean output directory before each build
  },
};
