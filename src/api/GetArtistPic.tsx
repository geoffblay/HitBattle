async function getArtistPic(artistId: string) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}`);
    const data = await response.json();
    return data['picture_medium'];
}

export { getArtistPic };