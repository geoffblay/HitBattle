async function getArtist(artistId: string) {
    const response = await fetch(`/api/artist/${artistId}`);
    const data = await response.json();
    return data;
}

export { getArtist };