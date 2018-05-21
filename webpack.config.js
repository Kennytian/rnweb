const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
// const WpPluginWatchOffset = require('wp-plugin-watch-offset');

module.exports = {
    stats: { assets: true, children: false, chunks: false, modules: false, source: false },
    entry: {
        bundle: path.join(__dirname, 'index.web'),
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
        extensions: ['.js', '.json', '.android.js', '.ios.js'],
        alias: { 'react-native': 'react-native-web' },
        modules: ['web_modules', 'node_modules'],
    },
    module: {
        loaders: [
            {
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
            },
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            plugins: [
                                "babel-plugin-react-native-web"
                            ],
                        },
                    },
                    {
                        loader: 'source-map-loader',
                    },
                ],
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name].[hash:8].[ext]',
                        emitFile: true,
                    },
                }],
            },
        ],
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, '..', 'build'),
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    devtool: 'inline-source-map',
};
