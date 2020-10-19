import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players$: Observable<Player[]>;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.players$ = this.playerService.getPlayers();
  }

  delete(playerId) {
    const ans = confirm('Do you want to delete Player with id: ' + playerId);
    if (ans) {
      this.playerService.deletePlayer(playerId).subscribe((data) => {
        this.loadPlayers();
      });
    }
  }
}