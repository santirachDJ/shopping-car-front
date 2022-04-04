const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // ...
              // Importing Ant here is not needed if you are using a .babelrc file
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es', // or "lib" for default
                  // No "style" setting
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|svg|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      // Include less-loader (exact settings may deviate depending on your building/bundling procedure)
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        issuer: {
          exclude: /\.less$/,
        },
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Define a second rule for only being used from less files
      // This rule will only be used for converting our sass-variables to less-variables
      {
        test: /\.scss$/,
        issuer: /\.less$/,
        use: {
          loader: require.resolve('./sassVarsToLess'), // Change path if necessary
        },
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
    
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
}
