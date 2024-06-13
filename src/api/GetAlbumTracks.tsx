import { Album, Track, Artist } from "../types";

async function getAlbumTracks(album: Album) {
    const response = await fetch(`/api/album/${album.id}`);
    const data = await response.json();
    return data['tracks']['data'].map((track: any): Track => {
        return {
            id: track.id,
            title: track.title,
            picture_medium: album.cover_medium,
            contributors: [track.artist as Artist]
        }
    });
}

export { getAlbumTracks };