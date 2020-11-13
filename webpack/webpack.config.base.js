const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: paths.dist,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  optimization: {
    splitChunks: { chunks: "all" },
  },
};
