import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MIXER_API } from '../global-resources/constants';
import { MixerStream } from '../models/mixer/stream';
import { MixerGame } from '../models/mixer/game';

@Injectable({
  providedIn: 'root'
})
export class MixerService {

  getType(typeId: string) {
    return this.http.get<MixerGame>(`${MIXER_API}/types/${typeId}`);
  }


  constructor(private http: HttpClient) { }


  getChannels(page: number, gamesIds?: number) {
    return this.http.get<MixerStream[]>(`${MIXER_API}/channels`,
      {
        params: {
          page: page.toString(),
          order: 'viewersCurrent:DESC',
          limit: '5',
          where: `typeId:eq:${gamesIds}`
        }
      });

  }

  getTypes(page: number, limit: number) {
    return this.http.get<MixerGame[]>(`${MIXER_API}/types`,
    {
      params: {
        page: page.toString(),
        order: 'viewersCurrent:DESC',
        limit: limit.toString()
      }
    });
  }
}
