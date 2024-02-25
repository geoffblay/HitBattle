import styled from 'styled-components';
import { getPlaylist } from '../api/GetPlaylist';
import { useEffect, useState } from 'react';


interface ArtistListProps {
    playlistID: string;
}

const ArtistList = ({ playlistID }: ArtistListProps) => {
    const [playlist, setPlaylist] = useState<any>({});

    useEffect(() => {
        getPlaylist(playlistID).then(data => setPlaylist(data));
    }, [playlistID]);

    return (
        <ArtistListContainer>
            <PlaylistTitle>{playlist.title}</PlaylistTitle>
        </ArtistListContainer>
  )
}

export default ArtistList

const ArtistListContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid red;
    width: 100%;
    padding-left: 2rem;
    `

const PlaylistTitle = styled.h2`
    font-size: 20px;
    `
