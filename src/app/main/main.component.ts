import { Planet } from './../models/planet.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // planetsList$: Observable<string[]>;
  planetsList: string[];
  pagination: number = 100;
  page: number = 1;
  pages: number[];

  resultsToShow: string[] = this.planetsList;

  constructor( private appStore: Store<fromStore.State> ) { }

  ngOnInit() {
    this.appStore.dispatch( new fromStore.GetAllPlanetsData );

    this.appStore.select( fromStore.getPlanetNames).subscribe(
      (list) => {
        this.planetsList = list;
        this.setNumberOfPages();
        this.setResultsToShow();
      }
    );



  }

  onSubmit(form: NgForm) {
    this.appStore.dispatch( new fromStore.SearchPlanets(form.value.searchTag.trim()));
  }

  changePagination(numberSel: number) {
    this.pagination = numberSel;
    this.setNumberOfPages();
    this.setResultsToShow();
  }

  changePage(page: number) {
    this.page = page;
    this.setResultsToShow();
  }

  setResultsToShow() {
    this.resultsToShow = [];
    this.planetsList.map(
      planet => {
        if (
          (this.planetsList.indexOf(planet) >= ((this.page - 1) * this.pagination)) &&
          (this.planetsList.indexOf(planet) < this.page * this.pagination )
          ) {
            this.resultsToShow.push(planet);
          }
      }
    );
  }

  setNumberOfPages() {
    this.pages = [];
    const numberOfPages =  Math.ceil((this.planetsList.length / this.pagination));
    for ( let i = 1; i <= numberOfPages; i++ ) {
      this.pages = [...this.pages, i];
    }
    if ( this.page > this.pages.length + 1 ) {
      this.page = 1;
    }
  }

}
