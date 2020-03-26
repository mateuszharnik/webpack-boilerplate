// eslint-disable-next-line
const Autoprefixer = require('autoprefixer');
// eslint-disable-next-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line
const CleanCSS = require('clean-css');
const { resolve } = require('path');

const entry = {
  // Tutaj dodajemy inne entry czyli pliki js
  main: './src/js/main.js',
  about: './src/js/about.js'
};

const output = {
  filename: 'js/[name].js',
  path: resolve(__dirname, 'dist'),
};

const dist = {
  style: {
    filename: 'css/style.css',
  },
  // Tutaj dodajemy inne pliki pug
  html: [{
    template: './src/html/index.pug',
    filename: './index.html',
    chunksSortMode: 'manual',
    chunks: ['libs', 'main'],
    minify: {
      sortAttributes: true,
      sortClassName: true,
    },
  }, {
    template: './src/html/about.pug',
    filename: './about.html',
    chunksSortMode: 'manual',
    chunks: ['libs', 'about'],
    minify: {
      sortAttributes: true,
      sortClassName: true,
    },
  }],
};

const optimizecss = {
  assetNameRegExp: /\.css$/g,
  cssProcessor: CleanCSS,
  cssProcessorOptions: { level: 2, rebase: false },
  canPrint: true,
};

const loaders = {
  less(prod) {
    return {
      test: /\.less$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        prod ? {
          loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' },
        } : {
          loader: 'style-loader', options: { sourceMap: true },
        },
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: [Autoprefixer({ browsers: ['last 3 versions'] })],
          },
        },
        { loader: 'less-loader', options: { sourceMap: true } },
      ],
    };
  },
  scss(prod) {
    return {
      test: /\.(scss|sass)$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        prod ? {
          loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' },
        } : {
          loader: 'style-loader', options: { sourceMap: true },
        },
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: [Autoprefixer({ browsers: ['last 3 versions'] })],
          },
        },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    };
  },
  css(prod) {
    return {
      test: /\.css$/,
      use: [
        prod ? {
          loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' },
        } : {
          loader: 'style-loader', options: { sourceMap: true },
        },
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: [Autoprefixer({ browsers: ['last 3 versions'] })],
          },
        },
      ],
    };
  },
  html: {
    test: /\.html$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'html-loader',
    options: {
      minimize: true,
    },
  },
  pug: {
    test: /\.pug$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'pug-loader',
    options: {
      minimize: true,
    },
  },
  eslint: {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
  },
  js: {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  },
  img: {
    test: /\.(png|jpe?g|gif|svg)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: '[name].[ext]',
      outputPath: 'img/',
    },
  },
};

module.exports = {
  entry,
  output,
  dist,
  optimizecss,
  loaders,
};
