/*
 * @Author: your name
 * @Date: 2021-04-07 10:25:24
 * @LastEditTime: 2021-04-07 11:11:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \alunchen\vue-component\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';

import HelloWorld from '@/components/helloworld';

Vue.config.productionTip = false;
Vue.use(HelloWorld);

new Vue({
  render: h => h(App)
}).$mount('#app');
