import { Dispatch } from 'redux';
import { LOAD_USERS, FINISH_LOADING } from './types';
import apiService from '../../service/api-service';
import { AxiosError, AxiosResponse } from 'axios';
import { setError } from '../errors/actions';

export const loadUsers = () => {
  return (dispatch: Dispatch) => {
    return apiService(dispatch, {
      url: '/api/users',
      method: 'get'
    })
      .then((response: AxiosResponse) => {
        dispatch({
          type: LOAD_USERS,
          users: response.data.users,
          loading: false
        });
      })
      .catch((error: any) => {
        console.log('WE HAVE AN ERROR!!!');
        setError(error.response.status);
        dispatch({
          type: FINISH_LOADING,
          loading: false
        });
      });
  };
};
