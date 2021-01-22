/*
 * @Author: your name
 * @Date: 2020-05-12 11:51:43
 * @LastEditTime: 2021-01-22 10:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli4-multi/pages.config.js
 */
const cdn = {
  element: {
    css: '//unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css',
    js: '//unpkg.com/element-ui@2.15.0/lib/index.js'
  },
  antDesignVue: {
    css: '//unpkg.com/ant-design-vue@1.7.2/dist/antd.min.css',
    js: '//unpkg.com/ant-design-vue@1.7.2/dist/antd.min.js'
  },
  antd: {
    css: '//unpkg.com/antd@4.10.3/dist/antd.min.css',
    js: '//unpkg.com/antd@4.10.3/dist/antd.min.js'
  },
  antdMobile: {
    css: '//unpkg.com/antd-mobile@2.3.4/dist/antd-mobile.min.css',
    js: '//unpkg.com/antd-mobile@2.3.4/dist/antd-mobile.min.js'
  },
  echarts: {
    js: '//unpkg.com/echarts@5.0.1/dist/echarts.min.js'
  },
  vueBase: [
    // '//unpkg.com/vue@3.0.5/dist/vue.global.prod.js',
    // '//unpkg.com/vue-router@4.0.3/dist/vue-router.global.prod.js',
    // '//unpkg.com/vuex@4.0.0-rc.2/dist/vuex.global.prod.js',
    '//unpkg.com/axios@0.19.0/dist/axios.min.js'
  ],
  reactBase: []
}

module.exports = {
  index: {
    template: 'public/index.html',
    filename: 'index.html',
    title: '前台',
    // cdn
    cdn: {
      css: [],
      js: [...cdn.vueBase]
    }
  },
  mobile: {
    template: 'public/index.html',
    filename: 'mobile.html',
    title: '移动端',
    cdn: {
      css: [],
      js: [...cdn.vueBase]
    }
  }
  // admin: {
  //   template: 'public/index.html',
  //   filename: 'admin.html',
  //   title: '后台管理'
  // }
}
