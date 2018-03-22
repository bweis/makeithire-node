// webpack.config.js
module.exports = {
  // Tell webpack to start bundling our app at app/index.js
  entry: './app',
  // Output our app to the dist/ directory
  output: {
    filename: 'app.js',
    path: 'dist'
  },
  // Emit source maps so we can debug our code in the browser
  devtool: 'source-map',
  // Tell webpack to run our source code through Babel
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
