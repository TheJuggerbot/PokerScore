import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';
import { PlayerAddEditComponent } from './player-add-edit/player-add-edit.component';
import { PlayerService } from './services/player.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerComponent,
    PlayerAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
