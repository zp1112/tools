/**
 * Created by wuhao on 2017/2/12.
 */
import qs from 'qs';
import request from 'superagent';

const axios = require('axios');

exports.AuthPlugin = function (app_remote, client_id, client_secret, auth_server_remote, ucenter_server_remote) {
  const search_params_str = document.location.search;
  if (search_params_str) {
    const code = search_params_str.split('&')[0].split('=')[1];
    const request_params = {
      client_id,
      client_secret,
      'redirect_uri': app_remote,
      code
    };
    axios.post(`${ucenter_server_remote}/api/ucenter/access_token?code=${request_params.code}&client_id=${request_params.client_id}&redirect_uri=${request_params.redirect_uri}&client_secret=${request_params.client_secret}`, qs.stringify(request_params)).then(({
      data
    }) => {
      localStorage.access_token = data.data.access_token;
      localStorage.user = JSON.stringify(data.data.user);
      window.location.href = app_remote;
    });
  } else {
    if (localStorage.access_token === 'undefined' || !localStorage.access_token) {
      location.href = auth_server_remote + '/auth/ticket?redirect_uri=' + app_remote + '&client_id=' + client_id;
    }
  }
};
