async function searchArtists(searchQuery: string) {
    const response = await fetch(`/api/search/artist?q=${searchQuery}`);
    const data = await response.json();
    return data;
}

export { searchArtists };