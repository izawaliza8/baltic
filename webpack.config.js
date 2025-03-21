const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
              webpackImporter: true,
              sassOptions: {
                fiber: false,
                outputStyle: 'compressed'
              }
            }
          }
        ],
      },
      {
        test: /\.twig$/,
        use: ['twig-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        },
        include: path.resolve(__dirname, 'assets/images')
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'videos/[name][ext]'
        },
        include: path.resolve(__dirname, 'assets/videos')
      }
    ]
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib"
    },
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kinn Collective',
      template: './templates/index.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './templates/about.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'collective.html',
      template: './templates/collective.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: './templates/contact.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'estelle-manor.html',
      template: './templates/estelle-manor.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'florentine-kitchen-knives.html',
      template: './templates/florentine-kitchen-knives.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'projects.html',
      template: './templates/projects.twig',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'services.html',
      template: './templates/services.twig',
      inject: true
    }),
    
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' // Remove contenthash for development
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        files: ['dist/**/*'],
        notify: false,
        open: false
      },
      {
        reload: false,
        injectCss: true
      }
    )
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: 'only',
    open: false,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/about/, to: '/about.html' },
        { from: /^\/collective/, to: '/collective.html' },
        { from: /^\/news/, to: '/news.html' },
        { from: /^\/faqs/, to: '/faqs.html' },
        { from: /^\/contact/, to: '/contact.html' },
        { from: /^\/estelle-manor/, to: '/estelle-manor.html' },
        { from: /^\/florentine-kitchen-knives/, to: '/florentine-kitchen-knives.html' },
        { from: /^\/projects/, to: '/projects.html' },
        { from: /^\/services/, to: '/services.html' },
  
        // Add more routes as needed
      ],
    },
    watchFiles: {
      paths: ['src/**/*', 'templates/**/*'],
      options: {
        usePolling: true
      }
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  }
};
