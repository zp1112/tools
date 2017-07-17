/**
 * Created by wuhao on 2017/3/28.
 */
import questionTypes from './qustion_types';

const defaultModel = {
  type: questionTypes.ANSWER,
  content: '您好，我是智能问答机器人，请详细描述您想咨询的问题。'
};
const defaultTypeChoosen = {
  type: questionTypes.WELCOME,
  content: '请问您要问的问题属于？',
  hasClicked1: false,
  hasClicked2: false
};
exports.defaultModel = defaultModel;
exports.defaultTypeChoosen = defaultTypeChoosen;
