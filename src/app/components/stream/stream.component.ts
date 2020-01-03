import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CHANNEL, STREAM_LINK_TWITCH, GAME_ID, PLATFORM, Platform, STREAM_LINK_MIXER } from 'src/app/global-resources/constants';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TwitchService } from 'src/app/services/twitch.service';
import { TwitchGame } from 'src/app/models/twitch/top-games-info';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { GameInfo } from 'src/app/models/view-models/game-info';
import { MixerService } from 'src/app/services/mixer.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
  channel: SafeUrl;
  width = 36;
  height: number;
  gameId: string;
  game: GameInfo;
  isMixer = false;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private twitchService: TwitchService,
    private mixerService: MixerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.gameId = params[GAME_ID];
      if (params[PLATFORM] === Platform.Twitch) {
        this.channel = this.sanitizer.bypassSecurityTrustResourceUrl(`${STREAM_LINK_TWITCH}${params[CHANNEL]}`);
        this.twitchService.getGame(params[GAME_ID])
          .subscribe(game => this.game = {
            id: game.id,
            name: game.name,
            gamePrviewImg: game.boxArtUrl
          });
      } else {
        this.isMixer = true;
        this.channel = this.sanitizer.bypassSecurityTrustResourceUrl(`${STREAM_LINK_MIXER}${params[CHANNEL]}`);
        this.mixerService.getType(this.gameId)
        .subscribe(game => this.game = {
          id: game.id.toString(),
          name: game.name,
          gamePrviewImg: game.backgroundUrl
        });
      }
    });

    if (window.innerWidth < 1270) {
      this.width = 36;
    }

    if (window.innerWidth < 800) {
      this.width = 26;
    }

    if (window.innerWidth < 370) {
      this.width = 16;
    }
  }

  onResize() {
    if (window.innerWidth < 1270) {
      this.width = 36;
    }

    if (window.innerWidth < 800) {
      this.width = 26;
    }

    if (window.innerWidth < 550) {
      this.width = 16;
    }
  }
}
