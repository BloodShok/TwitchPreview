import { TwitchUser } from './user';

export class TwitchStream {
    gameId: string;
    id: string;
    language: string;
    startdeAt: Date;
    tagIds: string[];
    thumbnailUrl: string;
    title: string;
    type: string;
    userId: string;
    userName: string;
    viewerCount: number;
    user: TwitchUser;
    gameName: string;
}
