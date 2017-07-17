let config = require('../config');
let webpack = require('webpack');
let merge = require('webpack-merge');
let utils = require('./utils');
let baseWebpackConfig = require('./webpack.base.conf');
let HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client']
    .concat(baseWebpackConfig.entry[name]);
});
module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // split vendor js into its own file
  ]
});
let pages = require('./getPages');
pages.forEach((conf) => {
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});

