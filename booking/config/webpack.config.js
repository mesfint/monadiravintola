const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main.tsx',
  mode: 'development',
  devServer: {
    port: 3002,
    historyApiFallback: true,
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
      exposes: {
        './BookTable': './src/components/BookTable.tsx', // Ensure this path is correct
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
  ],
};
