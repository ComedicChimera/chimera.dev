const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const svelteConfigOptions = require('./svelte.config.js')

// -------------------------------------------------------------------------- //

const mode = process.env.NODE_ENV || 'development'
const prod = mode == 'production'

const srcDir = path.resolve(__dirname, 'static/src')
const distDir = path.resolve(__dirname, 'static/dist')

// -------------------------------------------------------------------------- //

const babelConfig = {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
        }
    }
}

const cssConfig = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                url: false
            }
        }
    ]
}

const sassConfig = {
    test: /\.s[ac]ss$/,
    use: cssConfig.use.concat(['sass-loader'])
}

const tsConfig = {
    test: /\.ts$/,
    use: "ts-loader",
    exclude: /node_modules/
}

const svelteConfig = {
    test: /\.svelte$/,
    use: {
        loader: 'svelte-loader',
        options: svelteConfigOptions
    }
}

// TODO: post CSS config for @import?
// TODO: HMR config?

// -------------------------------------------------------------------------- //

module.exports = {
    mode: mode,
    entry: {
        base: path.resolve(srcDir, "styles/base.scss")
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.ts', '.js', 'mjs', '.svelte']
    },
    output: {
        path: distDir,
        filename: '[name].bundle.js',
        clean: true
    },
    module: {
        rules: [
            babelConfig,
            cssConfig,
            sassConfig,
            tsConfig,
            svelteConfig,
            {
                // Required to prevent errors from Svelte on Webpack 5+.
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false,
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].bundle.css', runtime: false })
    ]
}