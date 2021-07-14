import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/store/ui.reducer';
import * as auth from './auth/store/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/store/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  ingresosEgresos: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  ingresosEgresos: ingresoEgreso.inggresoEgresoReducer,
};
