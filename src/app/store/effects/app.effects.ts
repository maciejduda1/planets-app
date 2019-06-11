import { PlanetsDataService } from './../../services/planets-data.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';

import * as appActions from '../actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Planet } from 'src/app/models/planet.model';

export interface ResObject {
  count: number;
  next: string;
  previous?: any;
  results: Planet[];
}

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private getPlanetsDataService: PlanetsDataService ) {}

  getPlanetsData$ = createEffect(() => this.actions$.pipe(
    ofType( appActions.GET_ALL_PLANETS_DATA ),
    mergeMap((action: appActions.GetAllPlanetsData) => {
      return this.getPlanetsDataService.getPlanetsData( action.payload ).pipe(
        mergeMap(
          (res: ResObject) => {
            if ( res.next !== null ) {
              console.log(res.next);
              return [new appActions.GetAllPlanetsDataSuccess(res), new appActions.GetAllPlanetsData( res.next ) ];
            } else {
              return [new appActions.GetAllPlanetsDataSuccess( res )];
            }
          }
        ),
        catchError(
          error => of(new appActions.GetAllPlanetsDataFail(error))
        )
      );
    })
  ));
}
