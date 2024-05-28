export interface Artist {
    id: string;
    name: string;
    picture_medium: string;
}

export interface Track {
    id: string;
    title: string;
    picture_medium: string;
    contributors: Artist[];
}

export interface Album {
    id: string;
    title: string;
    cover_medium: string;
    tracks: Track[];
}