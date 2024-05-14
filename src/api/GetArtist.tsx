async function getArtist(artistID: string) {
    const response = await fetch(`/api/artist/${artistID}`);
    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
        picture_medium: data.picture_medium,
    };
}

export { getArtist };