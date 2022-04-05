const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    mode: 'production',
    target: 'web',
    externals: [],
    externalsPresets: {
        web: true
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            ['@babel/preset-react', { runtime: 'automatic' }]
                        ],
                        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|svg|mp3|mp4)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext][query]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        symlinks: false
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                cacheGroups: {
                    test: /node_modules/,
                    minSize: 50000,
                    name: 'vendors',
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}