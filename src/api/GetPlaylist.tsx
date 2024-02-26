async function getPlaylist(playlistId: string) {
    // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${playlistId}`);
    // const response = await fetch(`https://api.deezer.com/playlist/${playlistId}`);
    const response = await fetch(`/api/playlist/${playlistId}`);
    const data = await response.json();
    return data;
}

export { getPlaylist };