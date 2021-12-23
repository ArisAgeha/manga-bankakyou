/**
 * Build config for electron renderer process
 */

import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from '../scripts/CheckNodeEnv';
import DeleteSourceMaps from '../scripts/DeleteSourceMaps';

CheckNodeEnv('production');
DeleteSourceMaps();

const devtoolsConfig =
    process.env.DEBUG_PROD === 'true'
        ? {
              devtool: 'source-map',
          }
        : {};

export default merge(baseConfig, {
    ...devtoolsConfig,

    mode: 'production',

    target: 'electron-renderer',

    entry: [
        'core-js',
        'regenerator-runtime/runtime',
        path.join(__dirname, '../../src/index.tsx'),
    ],

    output: {
        path: path.join(__dirname, '../../src/dist'),
        publicPath: './dist/',
        filename: 'renderer.prod.js',
    },

    module: {
        rules: [
            // Extract all .global.css to style.css as is
            {
                test: /\.global\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            // Pipe other styles through css modules and append to style.css
            {
                test: /^((?!\.global).)*\.css$/,
                exclude: /antd\/dist\/antd\.css/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            // Add SASS support  - compile all .global.scss files and pipe it to style.css
            {
                test: /\.global\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // Provide path to the file with resources
                            resources: [
                                path.resolve(
                                    __dirname,
                                    '../../src/renderer/themes/variable.scss'
                                ),
                            ],
                        },
                    },
                ],
            },
            // Add SASS support  - compile all other .scss files and pipe it to style.css
            {
                test: /^((?!\.global).)*\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                            },
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // Provide path to the file with resources
                            resources: [
                                path.resolve(
                                    __dirname,
                                    '../../src/renderer/themes/variable.scss'
                                ),
                            ],
                        },
                    },
                ],
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    },
                },
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    },
                },
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream',
                    },
                },
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader',
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml',
                    },
                },
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader',
            },
        ],
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
        ],
    },

    plugins: [
        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
        }),

        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),

        new BundleAnalyzerPlugin({
            analyzerMode:
                process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true',
        }),
    ],
});
