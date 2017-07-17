/**
 * Created by wuhao on 2016/12/7.
 */
import {api} from './api';
import axios from 'axios';
let plugin = {
  installed: false
};
plugin.install = function(Vue) {
  if (plugin.installed) {
    return;
  }
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return api;
      }
    },
    $http: {
      get() {
        return axios;
      }
    }
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
export default plugin;
