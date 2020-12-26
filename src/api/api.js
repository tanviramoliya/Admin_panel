import { store } from '../redux/store/store';
import { history } from '../history';
import { setLoginFlag, setLoginUser } from '../redux/action/auth/loginAction';
import { getToken } from './getToken';
import { mainUrl, authUrl, status } from '../utility/config';

const axios = require('axios');

const handleError = (err) => {
  const { unAuthorized, forbidden, unAvailable } = status;
  if (
    err.response.status === unAuthorized ||
    err.response.status === forbidden ||
    err.response.status === unAvailable
  ) {
    localStorage.removeItem('adam-wa-mishmish');
    store.dispatch(setLoginFlag(false));
    store.dispatch(setLoginUser({}));
    history.push('/login');
  } else {
    return err.response;
  }
};

export const api = async (endpoint, data, type) => {
  let res;
  if (type !== 'postWithoutToken') {
    var token = await getToken();
  }

  switch (type) {
    case 'post':
      await axios({
        data: data,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = handleError(err);
        });
      break;
    case 'get':
      await axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          // 'x-auth': token,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = handleError(err);
        });
      break;
    case 'put':
      await axios({
        method: 'put',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "application/x-www-form-urlencoded",
          'x-auth': token,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = handleError(err);
        });
      break;

    case 'putUrlEncode':
      await axios({
        method: 'put',
        data: data,
        headers: {
          // "Content-Type": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-auth': token,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = handleError(err);
        });
      break;
    case 'delete':
      await axios({
        data: data,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = handleError(err);
        });
      break;
    case 'postWithoutToken':
      await axios({
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: authUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = err.response;
        });
      break;
    case 'postwithToken':
      await axios({
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-auth': token,
        },
        url: authUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = err.response;
        });
      break;

    case 'postWithUrlEncoded':
      await axios({
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-auth': token,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          res = err.response;
        });
      break;
    default:
      return true;
  }

  return res;
};
