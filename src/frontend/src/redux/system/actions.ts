import apiService from '../../service/api-service';
import { setCookie, removeCookie } from '../../service/cookie-service';
import history from '../../service/history';
import { LOG_IN, LOG_OUT } from './types';
import { Dispatch } from 'redux';

export function logIn(email: string, password: string): any {
  return (dispatch: Dispatch) => {
    return apiService(dispatch, {
      url: '/api/auth_token',
      data: { email, password },
      method: 'post'
    }).then((response: any) => {
      dispatch({
        type: LOG_IN,
        userId: response.data.user_id,
        authToken: response.data.auth_token
      });
      setCookie(response.data.auth_token, response.data.user_id);
      history.push('/oeci');
    });
  };
}

export function logOut() {
  removeCookie();
  return {
    type: LOG_OUT
  };
}

export function refreshLocalAuth(inputToken: string, inputId: string) {
  // refresh the 'max-age' for cookie while user is active
  setCookie(inputToken, inputId);
  return {
    type: LOG_IN,
    userId: inputId,
    authToken: inputToken
  };
}

export function OECILogIn(username: string, password: string): any {
  return (dispatch: Dispatch) => {
    return apiService(dispatch, {
      url: '/api/oeci_login',
      data: { oeci_username: username, oeci_password: password },
      method: 'post',
      authenticated: true
    })
      .then((response: any) => {
        console.log(response);
        // setCookie(response.data.auth_token, response.data.user_id);
        // history.push('/oeci');
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}
