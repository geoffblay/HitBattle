import styled from 'styled-components';
import { getPlaylist } from '../api/GetPlaylist';
import { useEffect, useState } from 'react';
import { getArtist } from '../api/GetArtistPic';
import { Artist } from '../types';

interface ArtistListProps {
    playlistID: string;
    limit?: number;
    onArtistSelect: (artist: Artist) => void;
    selectedArtist: Artist | null;
}

const ArtistList = ({ playlistID, limit, onArtistSelect, selectedArtist }: ArtistListProps) => {
    const [playlist, setPlaylist] = useState<any>({});
    const [artistIDs, setArtistIDs] = useState<string[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        getPlaylist(playlistID).then(data => {
            setPlaylist(data);
            const ids = data['tracks']['data'].map((track: any) => track['artist']['id']);
            setArtistIDs(ids);
        });
    }, [playlistID]);

    useEffect(() => {
        const fetchArtists = async () => {
            const limitedArtistIDs = artistIDs.slice(0, limit);
            const artists = await Promise.all(limitedArtistIDs.map(id => getArtist(id)));
            setArtists(artists.map(({ id, name, picture_medium }) => ({ id, name, picture_medium })));
        };
    
        fetchArtists();
    }, [artistIDs]);

    return (
        <ArtistListContainer>
            <PlaylistTitle>{playlist.title}</PlaylistTitle>
            <PicListContainer>
                {artists.map((artist, index) => {
                    const isSelected = artist.id === selectedArtist?.id;

                    return (
                        <ArtistImgNameContainer 
                            key={index}
                            onClick={() => {
                                onArtistSelect(artist);
                            }}
                            style={{
                                border: isSelected ? '2px solid #1DB954' : 'none',  
                            }}>
                            <img src={artist["picture_medium"]} width='100' height='100' key={index} />
                            <ArtistName>{artist["name"]}</ArtistName>
                        </ArtistImgNameContainer>
                    );
                })}
            </PicListContainer>
        </ArtistListContainer>
  )
}

export default ArtistList

const ArtistListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    gap: 1rem;
    `

const ArtistImgNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease;
    object-fit: cover;
    &:hover {
        transform: scale(1.1);
    }
    `

const ArtistName = styled.p`
    font-size: 14px;
    `
