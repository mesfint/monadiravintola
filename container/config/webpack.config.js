const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();
const packageJson = require("../package.json");

const isDevelopment = process.env.NODE_ENV !== 'production';
const isDemoMode = process.env.DEMO_MODE === 'true';


const getRemoteUrls = () => {
  if (isDevelopment) {
    return {
          // Only include necessary remotes for demo
      menu: process.env.DEV_MENU,
      booking: process.env.DEV_BOOKING,
       feedback: process.env.DEV_FEEDBACK,
       
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
      watchFiles: ['./src/**/*', 'dist/sw.js'],
      hot: true,
      devMiddleware: {
        writeToDisk: true, // Ensures sw.js is written to disk
      },
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },

    module: {
      rules: [
        {
          test: /sw\.(js|ts)$/,
          exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          }
        }
      ],
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
        remotes: isDemoMode ? 
         {
            // Only include necessary remotes for demo
            menu: `MenuHost@${process.env.DEV_MENU}/remoteEntry.js`,
         // MenuListHost: 'MenuListHost@http://localhost:3002/remoteEntry.js',
          //BookingHost: 'BookingHost@http://localhost:3003/remoteEntry.js',
          feedback: `FeedbackHost@${process.env.DEV_FEEDBACK}/remoteEntry.js`,
         }
         // All remotes
         : getRemoteUrls(),
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
          "@emotion/react": {
            singleton: true,
            requiredVersion: packageJson.dependencies["@emotion/react"],
          },
          "@emotion/styled": {
            singleton: true,
            requiredVersion: packageJson.dependencies["@emotion/styled"],
          },
          


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
          },
      
        ]
      })

    ],
  };
};
