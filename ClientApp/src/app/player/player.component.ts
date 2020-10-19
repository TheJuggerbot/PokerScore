import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player$: Observable<Player>;
  playerId: number;

  constructor(private playerService: PlayerService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.playerId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadPlayer();
  }

  loadPlayer() {
    this.player$ = this.playerService.getPlayer(this.playerId);
  }
}