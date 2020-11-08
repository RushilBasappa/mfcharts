const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

const devServerConfig = {
  mode: "development",
  devtool: "source-map",
  stats: {
    colors: true,
    children: false,
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    hot: true,
    open: true,
    inline: true,
    host: "localhost",
    port: 8080,
  },
};

module.exports = merge(baseConfig, devServerConfig);
