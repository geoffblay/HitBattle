import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import { useState } from 'react';
import { Artist } from '../types';

const NextArtist = () => {
    const [selectedArtist, setSelectedArtist] = useState<any>(null);

    const handleArtistSelect = (artist: Artist) => {
        setSelectedArtist(artist);
    }

    return (
        <HomeContainer>
            <SearchBarContainer>
                <h1>...Now choose another.</h1>
                <SearchBar />
            </SearchBarContainer>
            <ArtistList playlistID='1313621735' limit={5} onArtistSelect={handleArtistSelect} selectedArtist={selectedArtist}/>
            <ArtistList playlistID='3155776842' limit={5} onArtistSelect={handleArtistSelect} selectedArtist={selectedArtist}/>
            <ArtistList playlistID='6614423884' limit={5} onArtistSelect={handleArtistSelect} selectedArtist={selectedArtist}/>
        </HomeContainer>
    )
}

export default NextArtist

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
    `

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    `