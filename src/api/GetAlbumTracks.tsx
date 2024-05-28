import { Album, Track } from "../types";

async function getAlbumTracks(album: Album) {
    const response = await fetch(`/api/album/${album.id}/tracks`);
    const data = await response.json();
    return data['data'].map((track: any): Track => {
        return {
            id: track.id,
            title: track.title,
        }
    });
}

export { getAlbumTracks };