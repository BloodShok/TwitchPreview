import { MixerUser } from './user';
import { MixerGame } from './game';

export class MixerStream {
    featured: boolean;
    id: number;
    userId: number;
    token: string;
    online: boolean;
    featureLevel: number;
    partnered: boolean;
    transcodingProfileId?: any;
    suspended: boolean;
    name: string;
    audience: string;
    viewersTotal: number;
    viewersCurrent: number;
    numFollowers: number;
    description?: any;
    typeId: number;
    interactive: boolean;
    interactiveGameId?: any;
    ftl: number;
    hasVod: boolean;
    languageId: string;
    coverId?: any;
    thumbnailId?: any;
    badgeId?: any;
    bannerUrl?: any;
    hosteeId?: any;
    hasTranscodes: boolean;
    vodsEnabled: boolean;
    costreamId?: any;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: any;
    thumbnail?: any;
    user: MixerUser;
    type: MixerGame;
}

