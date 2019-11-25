export interface UserState {
  userList: User[];
  loading: boolean;
}

export interface User {
  admin: boolean;
  email: string;
  group: string;
  id: number;
  name: string;
  timestamp: Date;
}

export const LOAD_USERS = 'LOAD_USERS';
export const FINISH_LOADING = 'FINISH_LOADING';

interface LoadUsersAction {
  type: typeof LOAD_USERS;
  users: User[];
  loading: boolean;
}

interface FinishLoadingAction {
  type: typeof FINISH_LOADING;
  loading: boolean;
}

export type UserActionTypes = LoadUsersAction | FinishLoadingAction;
