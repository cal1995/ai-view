import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/test')
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: '/',
  routes
});

export default router;
