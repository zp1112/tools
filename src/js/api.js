/**
 * Created by 吴昊 on 2016/12/5.
 */
import { client_id, client_secret, auth_server_remote, ucenter_server_remote } from '../../config';
import { AuthPlugin } from './utils';
import 'babel-polyfill';
const axios = require('axios');
const qs = require('qs');
const apiHelper = require('aegis-api-helper');
const token = sessionStorage.getItem('auth-access-token');
const config = require('../../config');
const serviceHost = process.env.NODE_ENV === 'production'
  ? config.build.serviceHost
  : config.dev.serviceHost;

const apiObj = {
  upload: {
    url: 'http://192.168.11.88:7095/api/case_info/upload',
    method: 'post'
  },
  robotMulti: {
    url: `/api/law_inference/robot_multi`,
    method: 'post',
    isFormData: true
  }
};
const $apiProxy = apiHelper.define(apiObj, {
  headers: { common: { token }}
});

module.exports.api = $apiProxy;
module.exports.accessToken = token;
module.exports.serviceHost = serviceHost;
