/**
 * Created by candy on 2017/2/10.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [{
  path: '/',
  component: resolve => {
    System.import('../components/home.vue').then(comp => {
      resolve(comp);
    });
  }
}, {
  path: '/app',
  component: resolve => {
    System.import('../components/app.vue').then(comp => {
      resolve(comp);
    });
  },
  children: [
    { path: '/qrcode', component: resolve => {
      System.import('../components/qrcode/index.vue').then(comp => {
        resolve(comp);
      });
    } },
    { path: '/bing', component: resolve => {
      System.import('../components/bing/index.vue').then(comp => {
        resolve(comp);
      });
    } },
    { path: '/kuaidi', component: resolve => {
      System.import('../components/kuaidi/index.vue').then(comp => {
        resolve(comp);
      });
    } }
  ]
}
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active-link'
});
export default router;
