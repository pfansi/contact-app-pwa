const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebPwaManifest = require("webpack-pwa-manifest");

const path = require("path");

const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      cards: "./src/js/cards.js",
    },

    // TODO: Add the correct output
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
    },

    // TODO: Add the correct plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Contact Directory PWA App",
      }),
      new InjectManifest({
        swSrc: "/src-sw.js",
        swDest: "src-sw.js",
      }),

      new WebpackPwaManifest({
        name: "Contact Directory App",
        short_name: "Contact",
        description: "Render contact directories",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "/",
        publicPath: "/",
        orientation: "portrait",
        display: "standalone",
        crossorigin: null,

        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("src", "icons"),
          },
        ],
      }),
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
