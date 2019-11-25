import { SET_ERROR, ErrorMessage } from './types';
import { Dispatch } from 'redux';

export const setError = (inputCode: number) => {
  let errorType = 'none';
  if (inputCode === 403) {
    errorType = 'unauthorized';
    console.log(errorType);
  } else {
    errorType = 'technical';
  }
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_ERROR,
      error: errorType
    });
  };
};
