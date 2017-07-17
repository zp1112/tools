/**
 * Created by wuhao on 2016/12/6.
 */
import 'babel-polyfill';
import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import Element from 'element-ui';
import '../less/normalize.css';
import '../less/common.less';
import '../less/awesome/font-awesome.less';
import Home from '../components/wrapper.vue';
import router from './router';
import store from './store';
import ApiPlugin from '../js/api_plugin';

Vue.use(ApiPlugin);
Vue.use(Element);

export default new Vue({
  router,
  store,
  el: '#app',
  template: '<Home />',
  components: { Home }
});
