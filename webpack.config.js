const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

const enEl = require('hui/lib/locale/lang/en').default;
const zhEl = require('hui/lib/locale/lang/zh-CN').default;

const isProd = process.env.NODE_ENV === 'production';

const MOUNT_BASE = '/center/';

const cssLoaders = [
  {
    loader: 'css-loader',
    options: { importLoaders: 1, minimize: true },
  },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];
const extractVueCSS = new ExtractTextPlugin({
  filename: 'style.[contenthash].css',
  allChunks: true,
});
const extractVendorCSS = new ExtractTextPlugin('vendor.[contenthash].css');

const getConfig = (env = {}) => ({
  devtool: isProd ? '#source-map' : '#cheap-module-source-map',
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: MOUNT_BASE,
    filename: '[name].[hash].js',
  },
  devServer: /\.(yaml|json)$/.test(env.api)
    ? {
      setup(app) {
        // eslint-disable-next-line global-require
        const swagger = require('swagger-express-middleware');
        swagger(path.resolve(__dirname, env.api), app, (err, middleware) => {
          app.use(
            middleware.metadata(),
            middleware.parseRequest(),
            middleware.validateRequest(),
            middleware.mock(),
          );
        });
      },
    }
    : {
      host:
          []
            .concat(...Object.values(os.networkInterfaces()))
            .map(x => x.address)
            .find(addr => /^10\./.test(addr)) || 'localhost',
      openPage: MOUNT_BASE.slice(1),
      contentBase: path.join(__dirname, './dist'),
      proxy: {
        '/center/api': {
          target: env.api,
          onProxyReq(proxyReq, req) {
            const { host } = new URL(env.api);
            const referer = new URL(req.headers.referer);
            referer.host = host;
            proxyReq.setHeader('Host', host);
            proxyReq.setHeader('Referer', referer.href);
          },
        },
        '/center/casLogin': env.api,
        '/center/redirect': env.api,
      },
      before(app) {
        app.get('/center/languages/*', (req, res) => {
          res.end(
            fs.readFileSync(
              path.resolve(__dirname, './dist/languages', req.params[0]),
            ),
          );
        });
        app.get('/center/assets/*', (req, res) => {
          res.end(
            fs.readFileSync(
              path.resolve(__dirname, './dist/assets', req.params[0]),
            ),
          );
        });
      },
      historyApiFallback: {
        index: '/center/',
        rewrites: [],
      },
    },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          preserveWhitespace: false,
          postcss: [atImport(), cssnext()],
          loaders: {
            js: 'babel-loader',
            ...isProd && {
              css: extractVueCSS.extract({
                use: cssLoaders,
                fallback: 'vue-style-loader',
              }),
            },
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!([\\/]hui[\\/]src))/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.css$/,
        use: isProd
          ? extractVendorCSS.extract({
            use: cssLoaders,
            fallback: 'vue-style-loader',
          })
          : [
            'vue-style-loader',
            ...cssLoaders,
          ],
      },
    ],
  },
  plugins: [
    new class WatchCustomFilePlugin {
      constructor({ files, after }) {
        this.files = files;
        this.after = after;
      }
      apply(compiler) {
        compiler.plugin('after-compile', (compilation, callback) => {
          this.files.forEach((file) => {
            const dep = fs.statSync(file).isFile()
              ? 'fileDependencies'
              : 'contextDependencies';
            compilation[dep].push(file);
          });
          (this.after() || Promise.resolve()).then(() => {
            callback();
          });
        });
      }
    }({
      files: [path.resolve(__dirname, './languages')],
      after() {
        const elLang = { 'en-US': enEl, 'zh-CN': zhEl };
        Object.keys(elLang).forEach((lang) => {
          const source = `./languages/${lang}`;
          const dist = `./dist/languages/${lang}`;
          try {
            fs.outputJsonSync(`${dist}/element.json`, elLang[lang], {
              spaces: 2,
            });
            fs.copySync(`${source}/main.json`, `${dist}/main.json`);
          } catch (e) {
            console.log(e);
          }
        });
        return Promise.resolve();
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MOUNT_BASE': JSON.stringify(MOUNT_BASE),
      'process.env.ROUTE_BASE': JSON.stringify(MOUNT_BASE),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          /node_modules/.test(module.context) && !/\.css$/.test(module.request)
        );
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'assets/favicon.ico',
      filename: 'index.html',
    }),
    ...(isProd
      ? [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: { warnings: false },
        }),
        extractVendorCSS,
        extractVueCSS,
      ]
      : []),
  ],
});

module.exports = (env = {}) => {
  const ckeditorFiles = [
    'ckeditor.js',
    'contents.css',
    'lang/en.js',
    'lang/zh-cn.js',
    'plugins/icons.png',
    'plugins/image2/dialogs/image2.js',
    'plugins/image2/lang/en.js',
    'plugins/image2/lang/zh-cn.js',
    'plugins/image2/plugin.js',
    'plugins/link/dialogs/link.js',
    'plugins/link/images/anchor.png',
    'plugins/magicline/images/icon.png',
    'plugins/pastefromword/filter/default.js',
    'plugins/scayt/dialogs/dialog.css',
    'plugins/scayt/skins/moono-lisa/scayt.css',
    'plugins/table/dialogs/table.js',
    'plugins/tableselection/styles/tableselection.css',
    'plugins/widget/images/handle.png',
    'plugins/wsc/skins/moono-lisa/wsc.css',
    'skins/moono-lisa/dialog.css',
    'skins/moono-lisa/dialog_ie.css',
    'skins/moono-lisa/editor.css',
    'skins/moono-lisa/editor_ie.css',
    'skins/moono-lisa/icons.png',
    'skins/moono-lisa/images/close.png',
    'skins/moono-lisa/images/lock.png',
    'skins/moono-lisa/images/refresh.png',
    'styles.js',
  ];

  ckeditorFiles.forEach((file) => {
    fs.copySync(
      path.resolve('./node_modules/ckeditor', file),
      path.resolve('./dist/assets/ckeditor', file),
    );
  });

  return getConfig(env);
};
