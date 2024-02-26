async function getPlaylist(playlistId: string) {
    const response = await fetch(`/api/playlist/${playlistId}`);
    const data = await response.json();
    return data;
}

export { getPlaylist };