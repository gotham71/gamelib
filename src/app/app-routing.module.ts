import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamedetailComponent } from './components/gamedetail/gamedetail.component';
import { GameslistComponent } from './components/gameslist/gameslist.component';

const routes: Routes = [
  {path: '', redirectTo: 'gameslist', pathMatch: 'full'},
  {path: 'gameslist', component: GameslistComponent},
  //{path: 'gameslist/:searchItemInput', component: GameslistComponent},
  {path: 'game/:id/:slug', component: GamedetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
