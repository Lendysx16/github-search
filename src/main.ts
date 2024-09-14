import { PiniaVuePlugin } from 'pinia';
import Vue from 'vue';

import pinia from '@/plugins/pinia';

import App from '@/components/App.vue';

import { router } from './router/router';

Vue.use(PiniaVuePlugin);

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount('#app');
