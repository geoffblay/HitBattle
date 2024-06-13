import { Artist, Album } from '../types';

async function getArtistAlbums(artist: Artist) {
    const response = await fetch(`/api/artist/${artist.id}/albums`);
    const data = await response.json();
    return data['data'].map((album: any): Album => {
        return {
            id: album.id,
            title: album.title,
            cover_medium: album.cover_medium,
            tracks: [],
        }
    });
}

export { getArtistAlbums };