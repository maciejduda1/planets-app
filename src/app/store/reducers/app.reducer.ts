import { Planet } from 'src/app/models/Planet.model';
import * as fromMainActions from '../actions/actions';

export interface AppState {
  matchesCount: number;
  filter: string;
  planets: object;
  planetsRequested: boolean;
  planetsRecived: boolean;
}

const initialState: AppState = {
  matchesCount: 0,
  filter: '',
  planets: {},
  planetsRequested: false,
  planetsRecived: false,
};

export function appReducers(state = initialState, action: fromMainActions.AppActions) {
  switch ( action.type ) {
    case ( fromMainActions.GET_ALL_PLANETS_DATA ):
      return {
        ...state, planetsRequested: true, planetsRecived: false
      };

    case ( fromMainActions.GET_ALL_PLANETS_DATA_SUCCESS ):
      let planetsEntities = { ...state.planets };

      action.payload.results.map(
        (planet: Planet) => planetsEntities = { ...planetsEntities, [planet.name]: planet}
      );

      return {
        ...state,
        planets: planetsEntities,
        matchesCount: action.payload.count,
        planetsRequested: false,
        planetsRecived: true,
      };

    case ( fromMainActions.GET_ALL_PLANETS_DATA_FAIL ):
      return {
        ...state, planetsRequested: false, planetsRecived: false
      };

    case ( fromMainActions.SEARCH_PLANETS ):
      return {
        ...state, filter: action.payload
      };
    default:
      return state;
  }
}

export const getPlanetsData = ( state: AppState ) => state.planets;
export const getPlanetsDataRecivedState = ( state: AppState ) => state.planetsRecived;
export const getPlanetsDataRequestState = ( state: AppState ) => state.planetsRequested;
export const getFilter = ( state: AppState ) => state.filter;
