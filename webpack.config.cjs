const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/Components/Main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/Components'),
      assets: path.resolve(__dirname, 'src/assets'),
      contexts: path.resolve(__dirname, 'src/Contexts'),
      shared: path.resolve(__dirname, 'src/shared'),
      utilities: path.resolve(__dirname, 'src/Utilities'),
      styles: path.resolve(__dirname, 'src/Styles'),
      artists: path.resolve(__dirname, 'src/Components/Artists'),
      utils: path.resolve(__dirname, 'src/Components/Utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webm)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets/Home', to: 'assets/home' }],
    }),
  ],
};
