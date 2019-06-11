import { Planet } from './../../models/planet.model';
import { Action } from '@ngrx/store';

export const GET_ALL_PLANETS_DATA = 'Get all planets data';
export const GET_ALL_PLANETS_DATA_SUCCESS = 'Get all planets data success';
export const GET_ALL_PLANETS_DATA_FAIL = 'Get all planets data fail';

export const SEARCH_PLANETS = 'Search for planets';


export class GetAllPlanetsData implements Action {
  readonly type = GET_ALL_PLANETS_DATA;
  constructor( public payload?: string ) {}
}

export class GetAllPlanetsDataSuccess implements Action {
  readonly type = GET_ALL_PLANETS_DATA_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAllPlanetsDataFail implements Action {
  readonly type = GET_ALL_PLANETS_DATA_FAIL;
  constructor(public payload: any) { }
}

export class SearchPlanets implements Action {
  readonly type = SEARCH_PLANETS;
  constructor(public payload: string) { }
}

export type AppActions =
  GetAllPlanetsData |
  GetAllPlanetsDataSuccess  |
  GetAllPlanetsDataFail |
  SearchPlanets;
