import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromAppReducer from './app.reducer';

import { environment } from '../../../environments/environment';

export interface State {
  app: fromAppReducer.AppState;
}

export const reducers: ActionReducerMap<State> = {
  app: fromAppReducer.appReducers
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFeature = (state: State) => state.app;
