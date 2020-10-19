import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss']
})
export class PlayerAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formPlayerName: string;
  formCountry: string;
  formPlayerWinnings: number;
  playerId: number;
  errorMessage: any;
  existingPlayer: Player;

  constructor(private playerService: PlayerService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formPlayerName = 'playerName';
    this.formCountry = 'country';
    this.formPlayerWinnings = 0;
    if (this.avRoute.snapshot.params[idParam]) {
      this.playerId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        playerId: 0,
        playerName: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.playerId > 0) {
      this.actionType = 'Edit';
      this.playerService.getPlayer(this.playerId)
        .subscribe(data => (
          this.existingPlayer = data,
          this.form.controls[this.formPlayerName].setValue(data.PlayerName),
          this.form.controls[this.formCountry].setValue(data.Country),
          this.form.controls[this.formPlayerWinnings].setValue(data.PlayerWinnings)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let player: Player = {
        DateWon: new Date(),
        playerName: this.form.get(this.formPlayerName).value,
        country: this.form.get(this.formCountry).value,
        playerWinnings: this.form.get(+this.formPlayerWinnings).value
      };

      this.playerService.savePlayer(player)
        .subscribe((data) => {
          this.router.navigate(['/player', data.PlayerId]);
        });
    }

    if (this.actionType === 'Edit') {
      let player: Player = {
        PlayerId: this.existingPlayer.PlayerId,
        DateWon: this.existingPlayer.DateWon,
        playerName: this.form.get(this.formPlayerName).value,
        country: this.form.get(this.formCountry).value,
        playerWinnings: this.formPlayerWinnings + this.form.get(this.formPlayerWinnings)
      };
      this.playerService.updatePlayer(player.PlayerId, player)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get playerName() { return this.form.get(this.formPlayerName); }
  get country() { return this.form.get(this.formCountry); }
  get playerWinnings() { return this.form.get(this.formPlayerWinnings); }
}