import path = require('path');
import * as webpack from 'webpack';
import * as AssetsPlugin from 'assets-webpack-plugin';
import * as VueLoaderPlugin from 'vue-loader/lib/plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from './config/config';
const env = process.env.NODE_ENV || 'dev';
const port = config.port;
const isDev = env === 'dev';
console.log(`isDev === > ${isDev}`);
export default {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? '#eval' : 'none',
    entry: {
        tsvue: isDev
        ? ['webpack-hot-middleware/client?noInfo=true&reload=true', 'babel-polyfill', './app/index.ts']
        : './app/index.ts'
    },
    output: {
        path: path.resolve(__dirname, '../../build'),
        publicPath: isDev ? `http://localhost:${port}/build/` : `http://localhost:6006/`,
        filename: isDev ? '[name].js' : '[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less|\.css$/,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    // tsc编译后，再用babel处理
                    {loader: 'babel-loader'},
                    {
                        loader: 'ts-loader',
                        options: {
                            // 加快编译速度
                            transpileOnly: true,
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, '../../tsconfig.json'),
                            appendTsSuffixTo: [ /\.vue$/ ],
                        },
                    },
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, '../../tslint.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(otf|eot|ttf|woff)/,
                loader: 'url-loader',
                query: {
                    limit: 200000,
                    name: '[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.xtpl$/,
                loader: 'xtpl-loader',
                include: [
                    path.join(__dirname, './views'),
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
        }),
    ].concat(isDev ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [
            new AssetsPlugin({ filename: './build/assets.json' }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[hash:8].css',
                chunkFilename: '[id].[hash:8].css',
            }),
        ]),
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@app': path.join(__dirname, '../../app'),
            '@assets': path.join(__dirname, '../../app/assets'),
            '@api': path.join(__dirname, '../../app/api'),
            '@libs': path.join(__dirname, '../../app/libs'),
            '@store': path.join(__dirname, '../../app/store'),
            '@views': path.join(__dirname, '../../app/views'),
            '@router': path.join(__dirname, '../../app/router'),
            '@components': path.join(__dirname, '../../app/components'),
            '@config': path.join(__dirname, '../../app', 'config.ts'),
        },
    },
};
