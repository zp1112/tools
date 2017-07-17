/**
 * Created by candy on 2017/2/10.
 */
import Vue from 'vue';
import  Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  ie: false,
  question: ''
};
if (!!window.ActiveXObject || "ActiveXObject" in window) {
  state.ie = true;
}
const store = new Vuex.Store({
  state
});
export default store;
