


interface AlbumProps {
    id: number;
}

const AlbumArt = (props: AlbumProps) => {
    const { id } = props;
    // use Deezer API to get album art
    const albumArt = `https://api.deezer.com/album/${id}/image`;
    return <img src={albumArt} alt="Album Art" />;
}

export default AlbumArt;