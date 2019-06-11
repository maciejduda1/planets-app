import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: ':planetId', component: PlanetComponent }
  ]},
  { path: '*', redirectTo: ''},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
