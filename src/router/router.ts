import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { name: 'home', path: '/', component: () => import('@/views/List.vue') },
  {
    name: 'detail',
    path: '/detail/:owner/:repo',
    component: () => import('@/views/Detail.vue'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

router.beforeEach((to, from, next) => {
  router['previousRoute'] = from;
  next();
});
