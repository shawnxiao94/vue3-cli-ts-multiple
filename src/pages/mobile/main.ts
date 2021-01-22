/*
 * @Author: your name
 * @Date: 2021-01-20 18:56:28
 * @LastEditTime: 2021-01-22 11:54:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-antd/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@/registerServiceWorker'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
