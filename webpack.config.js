const webpack = require('webpack');
const path = require('path');
// const AssetsPlugin = require('assets-webpack-plugin');

const rootDirectory = path.resolve(__dirname, './');
const srcDirectory = path.resolve(__dirname, './src');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js|jsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(rootDirectory, 'index.web.js'),
    srcDirectory,
    path.resolve(rootDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(rootDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(rootDirectory, 'node_modules/react-navigation'),
    path.resolve(rootDirectory, 'node_modules/react-native-drawer-layout'),
    path.resolve(rootDirectory, 'node_modules/react-native-dismiss-keyboard'),
    path.resolve(rootDirectory, 'node_modules/react-native-safe-area-view'),
    path.resolve(rootDirectory, 'node_modules/react-native-tab-view')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Babel configuration (or use .babelrc)
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app.
      plugins: [
        // This is needed to polyfill ES6 async code in some of the above modules
        'babel-polyfill',
        // This aliases 'react-native' to 'react-native-web' to fool modules that only know
        // about the former into some kind of compatibility.
        'react-native-web'
      ],
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['react-native']
    }
  }
};

const jsonLoaderConfiguration = {
  test: /\.json$/,
  use: 'json-loader',
};

const urlLoaderConfiguration = {
  exclude: [
    /\.html$/,
    /\.(js|jsx)$/,
    /\.css$/,
    /\.json$/,
    /\.svg$/,
  ],
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[hash:8].[ext]',
      emitFile: true,
    },
  }],
};

const fileLoaderConfiguration = {
  test: /\.svg$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: 'media/[name].[hash:8].[ext]',
      emitFile: true,
    },
  }],
};

module.exports = {
  mode: 'development',
  stats: { assets: true, children: false, chunks: false, modules: false, source: false },
  entry: {
    bundle: path.join(rootDirectory, 'index.web.js'),
  },
  plugins: [
    // new AssetsPlugin({ filename: 'build/manifest.json', prettyPrint: true }),
    new webpack.DefinePlugin({
      'typeof __DEV__': JSON.stringify('boolean'),
      '__DEV__': JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.js', '.json', '.android.js', '.ios.js'],
    alias: { 'react-native': 'react-native-web' },
    modules: ['web_modules', 'node_modules'],
  },
  module: {
    rules: [
      urlLoaderConfiguration,
      babelLoaderConfiguration,
      jsonLoaderConfiguration,
      fileLoaderConfiguration,
    ],
  },
  output: {
    libraryTarget: 'umd',
    path: path.join(rootDirectory, '..', 'build'),
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'inline-source-map',
};
