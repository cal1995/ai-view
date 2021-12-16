import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/select-input',
    component: () => import('@/views/test')
  },
  {
    path: '/iview-table-columns-sort',
    component: () => import('@/views/test2')
  },
  {
    path: '/iview-text-edit',
    component: () => import('@/views/test3')
  },
  {
    path: '/iview-table-edit',
    component: () => import('@/views/test4')
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: '/',
  routes
});

export default router;
