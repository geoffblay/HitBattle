import { Album, Track, Artist } from "../types";

async function getAlbumTracks(album: Album) {
    const response = await fetch(`/api/album/${album.id}/tracks`);
    const data = await response.json();
    return data['data'].map((track: any): Track => {
        return {
            id: track.id,
            title: track.title,
            picture_medium: track.album.cover_medium,
            contributors: track.contributors.map((contributor: any): Artist => {
                return {
                    id: contributor.id,
                    name: contributor.name,
                    picture_medium: contributor.picture_medium
                };
            })
        }
    });
}

export { getAlbumTracks };