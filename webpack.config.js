const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;

const {
  entry, output, dist, optimizecss, loaders,
} = require('./config');

const preprocessor = 'scss'; // Ustaw preprocesor less lub scss

module.exports = (env) => {
  let prod = null;

  if (env) {
    prod = env.production;
  }

  return {
    entry,
    output,
    devServer: {
      compress: true,
      open: true,
    },
    devtool: prod ? '' : 'source-map',
    optimization: {
      splitChunks: {
        cacheGroups: {
          libs: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'libs',
            filename: 'js/libs.js',
          },
        },
      },
    },
    module: {
      rules: [
        loaders.css(prod),
        preprocessor === 'less' ? loaders.less(prod) : loaders.scss(prod),
        loaders.pug,
        loaders.eslint,
        loaders.js,
        loaders.img,
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(dist.style),
      ...dist.html.map(file => new HtmlWebpackPlugin(file)),
      new OptimizeCSSAssetsPlugin(optimizecss),
      new Imagemin({ test: /\.(jpe?g|png|gif|svg})$/i }),
    ],
  };
};
