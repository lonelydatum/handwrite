var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:1337',
        'webpack/hot/dev-server',
        './src/dev.js'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], include: path.join(__dirname, 'src') }
        ]
    },
     plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
    ]
};