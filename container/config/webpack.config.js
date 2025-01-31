const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
//const webpack = require("webpack");
const packageJson = require("../package.json");

module.exports = (env, argv) => {
  //const isProduction = argv.mode === "production";

  return {
    entry: "./src/main.tsx", // Entry point for the container app
    mode:  "development",

    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "auto",
    },

    devServer: {
      port: 3000,
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

    plugins: [
      new ModuleFederationPlugin({
        name: "container",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App", // Expose the container's main App
          "./GlobalTheme": "./src/styles/globalTheme.ts",

        },
        remotes: {
          MenuHost: "menu@http://localhost:3001/remoteEntry.js",
          MenuListHost: "menu@http://localhost:3001/remoteEntry.js",
          // BookTableHost: "booking@http://localhost:3002/remoteEntry.js",
          // FeedbackHost: "feedback@http://localhost:3003/remoteEntry.js",
        },
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

      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
