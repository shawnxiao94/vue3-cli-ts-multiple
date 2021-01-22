/*
 * @Author: your name
 * @Date: 2021-01-20 18:48:41
 * @LastEditTime: 2021-01-22 11:49:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-antd/vue.config.js
 */
const path = require("path");
const fs = require("fs");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_DEV = ["development"].includes(process.env.NODE_ENV);

const glob = require('glob')
const pagesInfo = require('./pages.config')
const pages = {}

glob.sync('./src/pages/**/main.ts').forEach(entry => {
  let chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.ts/)[1];
  const curr = pagesInfo[chunk];
  if (curr) {
    pages[chunk] = {
      entry,
      ...curr,
      chunk: ["chunk-vendors", "chunk-common", chunk]
    }
  }
})

const DEVELOPMENT = webpackConfig => {
  webpackConfig.store.set('devtool', 'eval-source-map')
  return webpackConfig
}

/**
 * @todo 生产环境配置
 * 每个额外的 loader/plugin 都有启动时间。尽量少使用不同的工具
 */

const PRODUCTION = webpackConfig => {
  /**
   * @todo 不需要启用 source-map，去除 console 的情况下 source-map 根本没用，还浪费大量时间和空间
   * 详情见：https://webpack.js.org/configuration/devtool/#devtool
   */
  webpackConfig.store.set('devtool', '')
  webpackConfig.plugin('html').tap(([options]) => [
    Object.assign(options, {
      minify: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: false,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true
      },
      cache: true, // 仅在文件被更改时发出文件
      hash: true, // true则将唯一的webpack编译哈希值附加到所有包含的脚本和CSS文件中,这对于清除缓存很有用
      scriptLoading: 'defer', // 现代浏览器支持非阻塞javascript加载（'defer'）,以提高页面启动性能。
      inject: true, // true所有javascript资源都将放置在body元素的底部
      chunksSortMode: 'none'
    })
  ])
  // gzip需要nginx进行配合
  webpackConfig
  .plugin("compression")
  .use(CompressionWebpackPlugin)
  .tap(() => [
    {
      test: /\.js$|\.html$|\.css/, // 匹配文件名
      threshold: 10240, // 超过10k进行压缩
      deleteOriginalAssets: true, // 是否删除源文件，这里最好不要删除
    }
  ]);
  return webpackConfig
}

module.exports = {
  publicPath: './',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: './static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  css: {
    // 如果你想去掉文件名的 .module
    // requireModuleExtension: false,
    loaderOptions: {
      // sass: {},
      less: {
        globalVars: {},
        srouceMap: IS_DEV,
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  parallel: require('os').cpus().length > 1,
  pages,
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  lintOnSave: IS_DEV,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  devServer: {
    // 配置自动启动浏览器
    open: true,
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false
    // proxy: {
    //   '/api': {
    //     target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
    //     changeOrigin: true
    //   }
    // }
  },
  pluginOptions: {
  },
  configureWebpack: config => {
    config.externals = {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // vuex: 'Vuex',
      axios: 'axios',
      // echarts: 'echarts',
      // 'element-ui': 'ELEMENT',
      // i18n: 'VueI18n',

    }
    // config.devtool =  "none", // webpack内关闭sourceMap
    // config.optimization = {
    //   // 优化配置
    //   splitChunks: {
    //     chunks: "all",
    //     cacheGroups: {
    //       // 拆分Vue
    //       vue: {
    //         test: /[\\/]node_modules[\\/]vue[\\/]/,
    //         name: "chunk-vue",
    //       },
    //     },
    //   },
    // }
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = IS_PROD
    config.optimization.minimizer[0].options.terserOptions.sourceMap = !IS_PROD
  },
  chainWebpack: config => {
    IS_DEV ? DEVELOPMENT(config) : PRODUCTION(config),
    // 添加别名
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@viewsIndex', resolve('src/pages/index/views'))
    .set('@viewsMobile', resolve('src/pages/mobile/views'))
    // 防止多页面打包卡顿
    config => config.plugins.delete('named-chunks')
    // 多页面cdn添加
    Object.keys(pagesInfo).forEach(page => {
      config.plugin(`html-${page}`).tap(args => {
        // html中添加cdn
        if (pagesInfo[page] && pagesInfo[page].cdn ) {
          args[0].cdn = pagesInfo[page].cdn
        }
        if (IS_DEV) {
          // 修复 Lazy loading routes Error
          args[0].chunksSortMode = 'none'
          args[0].minify = false
        }
        return args
      })
    })
    return config
  }
}
