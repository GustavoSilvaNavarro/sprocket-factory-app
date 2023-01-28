const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      }
    ]
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
    extensions: ['.ts', '.js']
  }
}
