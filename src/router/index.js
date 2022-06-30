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
  },
  {
    path: '/flex-grid',
    component: () => import('@/views/test5')
  },
  {
    path: '/iview-form',
    component: () => import('@/views/test6')
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: '/',
  routes
});

export default router;
