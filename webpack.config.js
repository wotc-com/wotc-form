const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = path.resolve(__dirname, './webpack.base.config.js');

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return [
    {
      // builds the demo webpage
      extends: [baseConfig],
      entry: {
        index: '/src/test/index.tsx'
      },
      devServer: {
        devMiddleware: {
          writeToDisk: false
        },
        hot: false
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [{ from: 'public', to: '' }]
        }),
        new HtmlWebpackPlugin()
      ]
    },
    {
      // builds the WOTC widget
      extends: [baseConfig],
      entry: {
        wotc_widget: '/src/components/WotcForm.tsx'
      },
      plugins: [
        new Webpack.DefinePlugin({
          'process.env.BASE_URL': JSON.stringify(isDevelopment ? '/jsonform.json' : 'https://api.wotc.com/v1')
        })
      ],
      output: {
        filename: 'WotcForm.js',
        library: 'WotcForm',
        libraryTarget: 'umd',
        umdNamedDefine: true
      }
    }
  ];
};
