const webpackClientConfig = require("./webpack.client.js");
const webpackServerConfig = require("./webpack.server.js");

module.exports = [webpackClientConfig, webpackServerConfig];
