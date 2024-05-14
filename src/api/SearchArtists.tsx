import { Artist } from '../types';

async function searchArtists(searchQuery: string) {
    const response = await fetch(`/api/search/artist?q=${searchQuery}`);
    const data = await response.json();
    return data['data'].map((artist: any): Artist => {
        return {
            id: artist.id,
            name: artist.name,
            picture_medium: artist.picture_medium,
        }
    });
}

export { searchArtists };