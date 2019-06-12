import { PlanetListComponent } from './planet-list/planet-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  { path: 'planets', component: MainComponent, children: [
    { path: ':planetName', component: PlanetComponent },
    { path: '', component: PlanetListComponent, pathMatch: 'full' }
  ]},
  { path: '', redirectTo: '/planets', pathMatch: 'full'},
  { path: '**', redirectTo: '/planets'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
