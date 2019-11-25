import {
  FINISH_LOADING,
  LOAD_USERS,
  UserActionTypes,
  UserState
} from './types';

const initialState: UserState = {
  userList: [],
  loading: true
};

export function usersReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case LOAD_USERS:
      return {
        userList: action.users,
        loading: action.loading
      };
    case FINISH_LOADING:
      return {
        userList: [],
        loading: action.loading
      };
    default:
      return state;
  }
}
