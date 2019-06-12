import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {

  planetsList: string[];
  pagination = 100;
  page = 1;
  pages: number[];
  filter: string;

  resultsToShow: string[] = this.planetsList;

  constructor(private appStore: Store<fromStore.State>) { }

  ngOnInit() {
    this.appStore.select(fromStore.getPlanetsGetStatus).subscribe(
      // tslint:disable-next-line:new-parens
      status => status ? null : this.appStore.dispatch(new fromStore.GetAllPlanetsData)
    );

    this.appStore.select(fromStore.getPlanetNames).subscribe(
      (list) => {
        this.planetsList = list;
        this.setNumberOfPages();
        this.setResultsToShow();
      }
    );

    this.appStore.select( fromStore.getFilter ).subscribe(
      filter => this.filter = filter
    );

  }

  onSubmit(form: NgForm) {
    this.appStore.dispatch(new fromStore.SearchPlanets(form.value.searchTag.trim()));
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
          (this.planetsList.indexOf(planet) < this.page * this.pagination)
        ) {
          this.resultsToShow.push(planet);
        }
      }
    );
  }

  setNumberOfPages() {
    this.pages = [];
    const numberOfPages = Math.ceil((this.planetsList.length / this.pagination));
    for (let i = 1; i <= numberOfPages; i++) {
      this.pages = [...this.pages, i];
    }
    if (this.page > this.pages.length + 1) {
      this.page = 1;
    }
  }
}
