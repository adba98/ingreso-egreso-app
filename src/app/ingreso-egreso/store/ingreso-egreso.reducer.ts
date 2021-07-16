import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.state';

export interface State {
  items: IngresoEgreso[] | null;
}

export interface AppStateIngreEgre extends AppState {
  ingresosEgresos: State;
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: null }))
);

export function ingresoEgresoReducer(
  state: State | undefined,
  action: Action
) {
  return _ingresoEgresoReducer(state, action);
}
