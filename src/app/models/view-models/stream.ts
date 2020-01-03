import { GameInfo } from './game-info';
import { UserInformation } from './user-info';
import { Platform } from 'src/app/global-resources/constants';

export class Stream {
    platform: Platform;
    viewerCount: number;
    title: string;
    previewImg: string;
    game: GameInfo;
    user: UserInformation;
}
