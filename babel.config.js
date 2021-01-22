/*
 * @Author: your name
 * @Date: 2021-01-20 18:52:39
 * @LastEditTime: 2021-01-22 10:21:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-multiple/babel.config.js
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // 按需加载
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: 'true'
      }
    ]
  ]
}
