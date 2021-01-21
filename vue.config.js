/*
 * @Author: your name
 * @Date: 2021-01-20 18:48:41
 * @LastEditTime: 2021-01-21 09:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-antd/vue.config.js
 */
const IS_DEV = process.env.NODE_ENV !== 'production'

const DEVELOPMENT = webpackConfig => {
  return webpackConfig
}

/**
 * @todo 生产环境配置
 * 每个额外的 loader/plugin 都有启动时间。尽量少使用不同的工具
 */

const PRODUCTION = webpackConfig => {
  return webpackConfig
}

module.exports = {
  publicPath: IS_DEV ? '/' : './',
  css: {
    loaderOptions: {
      less: {
        globalVars: {},
        srouceMap: IS_DEV,
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
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
  },
  chainWebpack: config => {
    IS_DEV ? DEVELOPMENT(config) : PRODUCTION(config)
  },
  productionSourceMap: false,
  lintOnSave: true
}