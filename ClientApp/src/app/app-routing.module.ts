import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';
import { PlayerAddEditComponent } from './player-add-edit/player-add-edit.component';

const routes: Routes = [
  { path: '', component: PlayersComponent, pathMatch: 'full' },
  { path: 'blogpost/:id', component: PlayerComponent },
  { path: 'add', component: PlayerAddEditComponent },
  { path: 'blogpost/edit/:id', component: PlayerAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
