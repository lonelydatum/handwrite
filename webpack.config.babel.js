import {join} from 'path'

const include = join(__dirname, 'src')

export default {
  entry: './src/HandwriteES5__ENTRY.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'Handwrite'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include},
      {test: /\.json$/, 'loader': 'json-loader', include},
    ]
  }
}

