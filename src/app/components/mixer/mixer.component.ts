import { Component, OnInit } from '@angular/core';
import { MixerService } from 'src/app/services/mixer.service';
import { mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { MixerStream } from 'src/app/models/mixer/stream';
import { MixerGame } from 'src/app/models/mixer/game';
import { StreamGames } from 'src/app/models/view-models/stream-game';
import { Stream } from 'src/app/models/view-models/stream';
import { Platform } from 'src/app/global-resources/constants';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent implements OnInit {

  constructor(private mixer: MixerService) { }

  gameStreams: StreamGames[];
  rowCount: number;
  rowHeight = 360;
  oldRowHeight = 361;
  isLoaded = false;

  ngOnInit() {
    if (window.innerWidth <= 600) {
      this.rowCount = 1;
    }

    if (window.innerWidth <= 1100 && window.innerWidth > 600) {
      this.rowCount = 2;
    }

    if (window.innerWidth > 1100) {
      this.rowCount = 5;
    }

    if (window.innerWidth <= 335) {
      this.rowHeight = 300;
    } else {
      this.rowHeight = 360;
    }


    this.mixer.getTypes(0, 5)
      .subscribe(games => {
        this.gameStreams = games.map(game => {
          return {
            game: {
              id: game.id.toString(),
              name: game.name,
              gamePrviewImg: game.backgroundUrl
            },
            streams: []
          };
        });

        this.gameStreams.map(stream => {
          this.mixer.getChannels(0, +stream.game.id)
            .subscribe(channals => {
              console.log(channals);
              stream.streams = channals.map(channal => {
                return {
                  platform: Platform.Mixer,
                  title: channal.name,
                  user: {login: channal.user.username, name: channal.user.username, profileImageUrl: channal.user.avatarUrl},
                  previewImg: channal.bannerUrl !== null ? channal.bannerUrl : '../../../assets/NoImage2.png',
                  viewerCount: channal.viewersCurrent,
                  game: stream.game
                } as Stream;
              });
              this.isLoaded = true;
            });
        });

      });

  }

  onResize(event: any) {
    if (window.innerWidth < 600) {
      this.rowCount = 1;
    }

    if (window.innerWidth <= 1100) {
      this.rowCount = 2;
    }

    if (window.innerWidth > 1100) {
      this.rowCount = 5;
    }

    // console.log(this.oldRowHeight + "<=" + event.target.innerWidth)
    if (event.target.innerWidth <= 335) {
      this.rowHeight = 300;
    } else {
      this.rowHeight = 360;
    }


    if (event.target.innerWidth <= 600) {
      this.rowCount = 1;
    }

    if (event.target.innerWidth > 718) {
      this.rowHeight = 360;
    }
    this.oldRowHeight = event.target.innerWidth;
  }
}
