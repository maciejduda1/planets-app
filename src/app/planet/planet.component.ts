import { Planet } from 'src/app/models/planet.model';
import { Component, OnInit } from '@angular/core';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planetData: Planet;
  constructor(private appStore: Store<fromStore.State>) { }

  ngOnInit() {
    this.appStore.select(fromStore.getPlanetsGetStatus).subscribe(
      // tslint:disable-next-line:new-parens
      status => status ? null : this.appStore.dispatch(new fromStore.GetAllPlanetsData)
    );

    this.appStore.select(fromStore.getSelectedPlanet).subscribe(
      planet => this.planetData = planet
    );
  }

}
