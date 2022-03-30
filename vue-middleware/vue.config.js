const CustomWebpackPlugin = require("./custom-webpack-plugin");
module.exports = {
  configureWebpack(config) {
    config.plugins.push(
      new CustomWebpackPlugin({
        text: "webpack自定义的插件",
      })
    );
  },
};
