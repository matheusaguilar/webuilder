const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EntryPlugin = require('./build/script/entryPlugin.js');

module.exports = (env, argv) => {
  const DEVELOPMENT = 'development';
  const mode = argv.mode? argv.mode : DEVELOPMENT;

  return {
    /**
     * DevServer
     */
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/bundle/',
      compress: true,
      disableHostCheck: true,
      port: 3100,
      watchOptions: {
        ignored: [
          path.resolve(__dirname, 'build/src'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'node_modules')
        ]
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      stats: 'errors-only'
    },
    /**
     * Webpack
     */
    devtool: mode == DEVELOPMENT? 'eval-source-map' : '',
    entry: EntryPlugin.entry(__dirname),
    output: {
      path: path.resolve(__dirname, 'dist/bundle'),
      publicPath: '/bundle/',
      filename: '[name]_bundle.js',
      devtoolModuleFilenameTemplate: info => {
        var $filename = 'sources://' + info.resourcePath;
        if (info.resourcePath.match(/\.vue$/) &&
          (!info.query.match(/type=script/) || !info.query.match(/lang=ts/))) {
          $filename = 'webpack-generated:///' + info.resourcePath + '?' + info.hash;
        } 
        return $filename;
      }
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'dist/assets'),
        '@src': path.resolve(__dirname, 'src/pages_src'),
        '@tests': path.resolve(__dirname, 'src/test')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              configFile: mode == DEVELOPMENT? 'tsconfig.json' : 'tsconfig.prod.json'
            }
          },
          exclude: /(node_modules|bower_components|dist)/
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                data: `@import "src/pages_src/css/common.scss";`,
                includePaths: ['node_modules']
              }
            }
          ]
        },

      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new EntryPlugin({ mode: argv.mode, basepath: __dirname })
    ]
  }
}