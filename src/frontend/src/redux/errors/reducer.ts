import { SET_ERROR, ErrorActionTypes, ErrorState } from './types';

const initialState: ErrorState = {
  errorType: 'none'
};

export function errorReducer(
  state = initialState,
  action: ErrorActionTypes
): ErrorState {
  switch (action.type) {
    case SET_ERROR:
      return {
        errorType: action.error
      };
    default:
      return state;
  }
}
