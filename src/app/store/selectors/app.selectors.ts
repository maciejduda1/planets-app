import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAppReducer from '../reducers/app.reducer';

export const getStoreState = createSelector(
  fromFeature.selectFeature,
  (state: fromAppReducer.AppState ) => state
);

export const getPlanetsList = createSelector(
  getStoreState,
  fromAppReducer.getPlanetsData
);

export const getPlanetsGetStatus = createSelector(
  getStoreState,
  fromAppReducer.getPlanetsDataRecivedState
);

export const getFilter = createSelector(
  getStoreState,
  fromAppReducer.getFilter
);

export const getPlanetNames = createSelector(
  getPlanetsList,
  getFilter,
  (planets, filter) => {
    const planetNames: string[] = Object.getOwnPropertyNames(planets);
    let filteredPlanetsNames: string[] = [];
    if ( filter ) {
      planetNames.map(
        name => name.toLowerCase().startsWith(filter) ? filteredPlanetsNames = [...filteredPlanetsNames, name] : null
      );
      return filteredPlanetsNames;
    }
    return planetNames;
  }
);

export const getSelectedPlanet = createSelector(
  getPlanetsList,
  fromFeature.selectUrl,
  (planets, params ) => planets[params.split('/').pop()]
);
