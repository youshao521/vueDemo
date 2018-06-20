const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');

module.exports = (config) => {
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome'],
    files: [
      'test/index.js',
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['spec', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['lcov', 'text-summary', 'cobertura'],
      dir: './coverage',
      fixWebpackSourcePaths: true,
    },
    webpackMiddleware: { noInfo: true },
    webpack: {
      devtool: '#eval',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: /node_modules/,
            include: /src/,
            enforce: 'post',
            options: {
              esModules: true,
            },
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              postcss: [atImport(), cssnext()],
              preLoaders: {
                js: 'istanbul-instrumenter-loader?esModules=true',
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
            ],
          },
          {
            test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader',
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          'process.env.MOUNT_BASE': JSON.stringify('/center/'),
          'process.env.ROUTE_BASE': JSON.stringify('/center/'),
        }),
      ],
    },
  });
};
