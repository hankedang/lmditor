const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'prod';

const cssBundlePlugin = new MiniCssExtractPlugin({
  filename: `css/lmditor${ENV == 'prod' ? '.min' : ''}.css`
});

const htmlPlugin = new HtmlWebpackPlugin({
  title: pkg.name,
  filename: 'index.html',
  template: './src/assets/index.ejs',
  inject: false
});

const bannerPlugin = new webpack.BannerPlugin(`${pkg.name} 
version ${pkg.version} 
Homepage: ${pkg.homepage}`);

// webpack plugins
const plugins = [
  htmlPlugin,
  cssBundlePlugin,
  bannerPlugin,
  new CleanWebpackPlugin({
    root: __dirname + '/dist',
    verbose:  true
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
];

// webpack rules 
const rules = [{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: [/node_modules/, /\.test\.js$/]
}, {
  test: /\.json$/,
  loader: 'json',
}, {
  test: /\?raw$/,
  loader: 'raw'
}, {
  test: /\.html$/,
  loader: 'raw'
}, {
  test: /\.(png|jpg|gif)\?*.*$/,
  loader: 'url?limit=8192&name=img/[hash].[ext]'
}, {
  test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
  loader: 'url?limit=8192&name=font/[hash].[ext]'
}, {
  test: /\.less$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
}, {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
}];

// webpack configs
module.exports = {
  mode:`${ENV == 'prod' ? 'production' : 'development'}`,
  entry:  {
    'lmditor': __dirname + `/src/client/index.js`
  },
  output: {
    path:  __dirname +'/dist',
    filename: `js/[name]${ENV == 'prod' ? '.min' : ''}.js`
  },
  devtool: 'source-map',
  module: {
    rules: rules
  },
  plugins: plugins,
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({
          safe: true,
          sourcMap: true,
          autoprefixer: { disable: true }, 
          discardComments: {
            removeAll: true // 移除注释
          }
        })
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist'
  }
}