const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*-------------------------------------------------*/
module.exports = {
  target: "web",
  mode: "development" !== process.env.NODE_ENV ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/styles.css",
    }),

    new HTMLWebpackPlugin({
      filename: "static/index.html",
      template: path.resolve(__dirname, "public/index.html"),
      minify: false,
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },

  devServer: {
    port: 8088,
    historyApiFallback: true,
  },

  devtool: "source-map",
};
