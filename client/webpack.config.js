const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    // Entry point for files.
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Output for bundled files.
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file with links to the generated bundles.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor',
      }),
      // Injects the custom service worker into the build.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // Generates a manifest.json file for progressive web app features.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Create notes with or without an internet connection!',
        background_color: '#272822',
        theme_color: '#272822',
        start_url: './',
        publicPath: './',
        // Configures icons for different sizes and resolutions.
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        // Handles CSS files: style-loader to inject styles, css-loader for CSS modules.
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Transpiles JavaScript using Babel for compatibility with older browsers.
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};
