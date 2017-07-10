const path = require('path');
const webpack = require('webpack');
console.log(process.env.NODE_ENV)

module.exports = {
  entry: { index: '.' },

  output: {
    filename: 'build/[name].js',
    library: 'react-easy-print',
    libraryTarget: "commonjs2",
  },

  context: path.join(__dirname, 'src'),

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production',
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin() : null,
    new webpack.optimize.ModuleConcatenationPlugin(), // webpack3
  ].filter(v => v),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions'],
              },
              modules: false,
              useBuiltIns: true,
            }],
            'react',
            'stage-2',
          ],
          cacheDirectory: true,
          plugins: [
            ['transform-react-remove-prop-types', {
              mode: 'remove',
              removeImport: true,
            }],
            'transform-runtime',
          ]
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
              camelCase: 'only',
              getLocalIdent: (ctx, localIdentName, localName) => `print-${ new Buffer('p').toString('base64').slice(0, -2) }__${ localName }`,
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
  },
};
