const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ //will create a index.html file in dists folder using template
        title: 'Production html file',
        template: './index.html',
      }),
      // creates a manifest.json that can bring the app outside of the browser
      new WebpackPwaManifest({
        name: "PWA TEXT EDITOR",
        short_name: "JATE",
        description: "Just Another Text Editor!",
        background_color: "#fca311",
        theme_color: "#fca311",
        crossorigin: 'use-credentials',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
          purpose: 'any',
        }],
      }),
      new InjectManifest({ //will create a service worker based on the "schema" for more control. 
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
        
      ],
    },
  };
};
