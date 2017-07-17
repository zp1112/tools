/**
 * Created by wumaohui on 2017/3/2.
 */
//修改compareForm信息
export default {
  ALTER_COMPAREFORM (state, obj) {
    Object.assign(state.compareForm, obj);
  },
  ALTER_SEARCHFORM (state, obj) {
    Object.assign(state.searchForm, obj);
  },
}
