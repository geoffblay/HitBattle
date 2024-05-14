export interface Artist {
    id: string;
    name: string;
    picture_medium: string;
}

export interface Track {
    id: string;
    title: string;
}

export interface Album {
    id: string;
    title: string;
    cover_medium: string;
    tracks: Track[];
}