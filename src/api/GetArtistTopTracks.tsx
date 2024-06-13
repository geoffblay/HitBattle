import { Artist, Track } from '../types';

async function getArtistTopTracks(artist: Artist, limit: number = 20) {
    const response = await fetch(`/api/artist/${artist.id}/top?limit=${limit}`);
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

export { getArtistTopTracks };