/*
 * @Author: your name
 * @Date: 2021-01-22 10:46:40
 * @LastEditTime: 2021-01-22 11:52:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-multiple/src/pages/index/router/index.ts
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const asyncImport = (file: string) => () =>
  import(/* webpackChunkName: "vueinfo" */ '@viewsIndex/' + file + '.vue')

const routes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    component: asyncImport('Home/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
