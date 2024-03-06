const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';
  return {
    entry: {
      wotc_widget: '/src/components/WotcForm.tsx'
    },
    target: 'web',
    devtool: isDevelopment ? 'eval' : 'source-map',
    devServer: {
      devMiddleware: {
        writeToDisk: true
      },
      hot: false
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: '' }]
      }),
      new HtmlWebpackPlugin(),
      new Webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(isDevelopment ? '/jsonform.json' : 'https://api.wotc.com/v1')
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '...'],
      alias: {
        '~': path.resolve(__dirname, '../src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          exclude: [/node_modules/],
          options: {
            transpileOnly: true
          }
        },
        {
          test: /\.s?css/i,
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
          type: 'asset'
        }
      ]
    },
    optimization: {
      usedExports: false,
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    },
    output: {
      clean: true,
      filename: 'WotcForm.js',
      library: 'WotcForm',
      libraryTarget: 'umd'
    }
  };
};
