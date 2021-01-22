<!--
 * @Author: your name
 * @Date: 2021-01-20 18:55:41
 * @LastEditTime: 2021-01-22 11:55:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-antd/src/App.vue
-->
<template>
  <div id="content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
#content {
  position: relative;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  padding-left: 230px;
}
</style>
