import styled from 'styled-components';
import { getPlaylist } from '../api/GetPlaylist';
import { useEffect, useState } from 'react';
import ArtistPic from './ArtistPic';
import { getArtistPic } from '../api/GetArtistPic';
interface ArtistListProps {
    playlistID: string;
    limit?: number;
}

const ArtistList = ({ playlistID, limit }: ArtistListProps) => {
    const [playlist, setPlaylist] = useState<any>({});
    const [artistIDs, setArtistIDs] = useState<string[]>([]);
    const [artistPics, setArtistPics] = useState<string[]>([]);

    useEffect(() => {
        getPlaylist(playlistID).then(data => {
            setPlaylist(data);
            const ids = data['tracks']['data'].map((track: any) => track['artist']['id']);
            setArtistIDs(ids);
        });
    }, [playlistID]);

    useEffect(() => {
        const fetchArtistPics = async () => {
            const limitedArtistIDs = artistIDs.slice(0, limit);
            const pics = await Promise.all(limitedArtistIDs.map(id => getArtistPic(id)));
            setArtistPics(pics);
        };
    
        fetchArtistPics();
    }, [artistIDs]);

    return (
        <ArtistListContainer>
            <PlaylistTitle>{playlist.title}</PlaylistTitle>
            <PicListContainer>
                {artistPics.map((pic, index) => (
                    <ArtistPic key={index} pic={pic} width="100px" height="100px" />
                ))}
            </PicListContainer>

        </ArtistListContainer>
  )
}

export default ArtistList

const ArtistListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid red;
    width: 100%;
    padding-left: 2rem;
    `

const PlaylistTitle = styled.h2`
    font-size: 20px;
    `

const PicListContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    `
