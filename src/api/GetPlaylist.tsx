async function getPlaylist(playlistId: string) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${playlistId}`);
    const data = await response.json();
    return data;
}

export { getPlaylist };