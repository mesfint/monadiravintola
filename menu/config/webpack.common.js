const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].js', // Naming convention for output files
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean output directory before each build
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/, // Handle JavaScript and TypeScript files
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
};
