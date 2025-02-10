const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();
const packageJson = require("../package.json");

const isDevelopment = process.env.NODE_ENV !== 'production';

const getRemoteUrls = () => {
  if (isDevelopment) {
    return {
      MenuHost: process.env.DEV_MENU,
      MenuListHost: process.env.DEV_MENU,
      // BookTableHost: process.env.DEV_BOOKING,
       FeedbackHost: process.env.DEV_FEEDBACK,
       
    };
  }
  return process.env.CONTAINER_URL || 'container@http://localhost:3000/remoteEntry.js';
};


module.exports = (env, argv) => {
  //const isProduction = argv.mode === "production";

  return {
    entry: "./src/main.tsx", // Entry point for the container app
    mode: isDevelopment ? 'development' : 'production',

    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "auto",
    },

    devServer: {
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "dist"),
      },
      hot: true,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    performance: {
      hints: isDevelopment ? false : 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: false,
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "container",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App", // Expose the container's main App
          "./GlobalTheme": "./src/styles/globalTheme.ts",

        },
        remotes: getRemoteUrls(),
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: packageJson.dependencies.react,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: packageJson.dependencies["react-dom"],
          },
          "@mui/material": "@mui/material", 
          "@mui/icons-material": "@mui/icons-material",
          


        },

      }),
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // }),

      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      // Copy assets to dist folder
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'public/assets',
            to: 'assets'
          }
        ]
      })

    ],
  };
};
