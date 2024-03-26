const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';
  return {
    target: 'web',
    devtool: isDevelopment ? 'eval' : 'source-map',
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
    }
  };
};
