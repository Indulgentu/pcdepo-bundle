'use strict';

const path = require('path');
// Add Tailwind CSS and PostCSS configuration
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })]
};

module.exports = {
    resolve: resolve,
    entry: {
        site: SOURCE_ROOT + '/site/main.js'
    },
    output: {
        filename: () => {
            return "clientlib-[name]/[name].js";
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                              plugins: {
                                'postcss-import': {},
                                tailwindcss,
                                autoprefixer
                              }
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    publicPath: '/apps/pcdepo/clientlibs/clientlib-site/resources/fonts/',
                    outputPath: './clientlib-site/fonts',
                    filename: '[name][ext]',
                },
            },
            {
                test: /\.(sass|less|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js', 'ts', 'tsx']
        }),
        new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site' }
            ]
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new webpack.DefinePlugin({
            'process.versions': JSON.stringify(process.versions),
        })
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};
