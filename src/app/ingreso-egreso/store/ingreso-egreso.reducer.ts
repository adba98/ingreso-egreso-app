import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

export interface State {
  items: IngresoEgreso[] | null;
}

export const initialState: State = {
  items: [],
};

const _inggresoEgresoReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: null }))
);

export function inggresoEgresoReducer(
  state: State | undefined,
  action: Action
) {
  return _inggresoEgresoReducer(state, action);
}
