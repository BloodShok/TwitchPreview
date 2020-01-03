import { Component, OnInit } from '@angular/core';
import { TwitchGame } from 'src/app/models/twitch/top-games-info';
import { TwitchStream } from 'src/app/models/twitch/streams';
import { TwitchService } from 'src/app/services/twitch.service';
import { Stream } from 'src/app/models/view-models/stream';
import { StreamGames } from 'src/app/models/view-models/stream-game';
import { Platform } from 'src/app/global-resources/constants';


@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements OnInit {

  constructor(private twitchService: TwitchService) { }
  translationsTwitch: TwitchStream[] = [];
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

    this.twitchService.getTopGames(5).subscribe(games => {

      this.gameStreams = games
      .map(game => {
        if (game) {
          return {
           game: {
             id: game.id,
             name: game.name,
             gamePrviewImg: game.boxArtUrl,
           },
            streams: []
          } as StreamGames;
        }
      })
        .filter(gameInf => {
          if (gameInf.game.name !== 'Death Stranding') {
            return gameInf;
          }
        });

      this.gameStreams.map(gameStream => {
        this.twitchService.getStreamsByGameId(gameStream.game.id)
          .subscribe(streamsTwitch => {
            streamsTwitch.map(stream => {
              this.twitchService.getUser(stream.userId)
                .subscribe(user => {
                  stream.user = user;
                  gameStream.streams.push({
                    platform: Platform.Twitch,
                    title: stream.title,
                    previewImg: stream.thumbnailUrl,
                    user: {
                      login: user.login,
                       name: stream.userName,
                        profileImageUrl: user.profileImageUrl
                      },
                    viewerCount: stream.viewerCount,
                    game: gameStream.game
                  });
                  this.isLoaded = true;
                });
            });
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
