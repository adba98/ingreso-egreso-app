import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: true,
};

const _uiReducer = createReducer(
  initialState,
  on(isLoading, (state: any) => ({ ...state, isLoading: true })),
  on(stopLoading, (state: any) => ({ ...state, isLoading: false }))
);

export function uiReducer(state: State | undefined, action: Action) {
  return _uiReducer(state, action);
}
