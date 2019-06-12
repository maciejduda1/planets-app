import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';

import { getSelectors, RouterReducerState, routerReducer  } from '@ngrx/router-store';

import * as fromAppReducer from './app.reducer';

import { environment } from '../../../environments/environment';

export interface State {
  app: fromAppReducer.AppState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  app: fromAppReducer.appReducers,
  router: routerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFeature = (state: State) => state.app;


export const selectRouter = createFeatureSelector<
  State,
  RouterReducerState<any>
>('router');

export const {
  selectQueryParams,    // select the current route query params
  selectRouteParams,    // select the current route params
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = getSelectors(selectRouter);
