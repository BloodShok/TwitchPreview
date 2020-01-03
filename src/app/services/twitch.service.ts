import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, concatMap } from 'rxjs/operators';
import { TwitchStream } from '../models/twitch/streams';
import { TwitchUser } from '../models/twitch/user';
import { TwitchGame } from '../models/twitch/top-games-info';
import { async } from 'rxjs/internal/scheduler/async';



@Injectable({
  providedIn: 'root'
})
export class TwitchService {
  readonly ID: string = 'id';
  constructor(private http: HttpClient) { }


  getStreamsByGameId(gameId: string) {
    return this.http.get<{ data: any[] }>('https://api.twitch.tv/helix/streams', {
      params: {
        game_id: gameId,
        first: '5'
      }
    })
      .pipe(
        map(responce => responce.data
          .map(data => {
            return {
              id: data.id,
              gameId: data.game_id,
              language: data.language,
              startdeAt: data.startde_at,
              tagIds: data.tag_id,
              thumbnailUrl: data.thumbnail_url.replace('{width}x{height}', '300x170'),
              title: data.title,
              type: data.type,
              userId: data.user_id,
              userName: data.user_name,
              viewerCount: data.viewer_count
            } as TwitchStream;
          })
        ));

  }

  getUser(userId: string) {
    return this.http.get<{ data: any[] }>('https://api.twitch.tv/helix/users', { params: { id: userId } })
      .pipe(map(responce => {
        return responce.data.map(data => {
          return {
            id: data.id,
            login: data.login,
            email: data.email,
            description: data.description,
            broadcasterType: data.broadcaster_type,
            displayName: data.display_Name,
            offlineImageUrl: data.offline_image_url,
            profileImageUrl: data.profile_image_url,
            type: data.type,
            viewCount: data.view_count
          } as TwitchUser;
        })[0];
      }));
  }

  getUsers(userIds: string[]) {
    return this.http.get<{ data: any[] }>('https://api.twitch.tv/helix/users', { params: { id: userIds } })
      .pipe(map(responce => {
        return responce.data.map(data => {
          return {
            id: data.id,
            login: data.login,
            email: data.email,
            description: data.description,
            broadcasterType: data.broadcaster_type,
            displayName: data.display_Name,
            offlineImageUrl: data.offline_image_url,
            profileImageUrl: data.profile_image_url,
            type: data.type,
            viewCount: data.view_count
          } as TwitchUser;
        });
      }));
  }

  getTopGames(count: number = 20) {
    return this.http.get<{ data: any[] }>('https://api.twitch.tv/helix/games/top', {
      params: {
        first: count.toString()
      }
    }).pipe(
      map(responce => responce.data.map(game => {
        return {
          id: game.id,
          name: game.name,
          boxArtUrl: game.box_art_url
        } as TwitchGame;
      })
      .map(gameInfo => {
        gameInfo.boxArtUrl = gameInfo.boxArtUrl.replace('{width}x{height}', '50x66');
        return gameInfo;
      }))
    );
  }


  getGame(gameId: string) {
    return this.http.get<{ data: any[] }>('https://api.twitch.tv/helix/games', {
      params: {
        id: gameId,
      }
    }).pipe(
      map(responce => responce.data.map(game => {
        return {
          id: game.id,
          name: game.name,
          boxArtUrl: game.box_art_url
        } as TwitchGame;
      })
      .map(gameInfo => {
        gameInfo.boxArtUrl = gameInfo.boxArtUrl.replace('{width}x{height}', '80x105');
        return gameInfo;
      })[0])
    );
  }
}
