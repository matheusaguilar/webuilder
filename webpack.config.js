const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EntryPlugin = require('./build/script/entryPlugin.js');

module.exports = (env, argv) => {
    return {
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            disableHostCheck: true,
            port: 3000,
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
        entry: EntryPlugin.entry(__dirname),
        output: {
            path: path.resolve(__dirname, 'dist/bundle'),
            filename: '[name]_bundle.js',
            publicPath: '/'
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js', '.vue', '.json'],
            alias: {
              _Components: path.resolve(__dirname, 'src/components'),
              _Assets: path.resolve(__dirname, 'dist/assets'),
              _PagesSrc: path.resolve(__dirname, 'src/pages_src'),
              _Tests: path.resolve(__dirname, 'src/test')
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
                            appendTsSuffixTo: [/\.vue$/]
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