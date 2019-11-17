const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  // target: 'web',
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      }],
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin,
        'css-loader',
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: './assets/icons/icons.svg',
      },
    },
    {
      test: /\.(woff|woff2|ttf|otf|eot)$/i,
      use: [{
        loader: 'file-loader?name=[name].[ext]',
        options: {
          outputPath: 'assets/fonts',
          name: '[name].[ext]',
        },
      }],
    },
    {
      test: /\.(png|jpe?g|gif|jpg)$/i,
      include: path.resolve(__dirname, 'src/assets/img'),
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'img',
          name: '[name].[ext]',
        },
      }],
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
      },
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id]',
    }),
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'index.html',
    watchContentBase: true,
    compress: true,
    port: 9000,
    writeToDisk: true,
    overlay: false, // error on full page
    open: true, // open in browser
    hot: false,
    inline: false,

    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
