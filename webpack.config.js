const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: '.',

  output: {
    filename: 'build/[name].js'
  },

  context: path.join(__dirname, "src"),

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production',
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), // webpack3
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: [
            ['env', {
              modules: false,
              useBuiltIns: true,
            }],
            'react',
            'stage-2',
          ],
          cacheDirectory: true,
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 1 version'],
                }),
                require('postcss-nested')({}),
              ],
            }
          },
        ]
      }
    ]
  }
}
