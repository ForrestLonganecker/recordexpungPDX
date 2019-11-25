export interface ErrorState {
  errorType: ErrorMessage;
}

export type ErrorMessage = 'none' | 'unauthorized' | 'technical';

export const SET_ERROR = 'SET_ERROR';

interface SetErrorAction {
  type: typeof SET_ERROR;
  error: ErrorMessage;
}

export type ErrorActionTypes = SetErrorAction;
