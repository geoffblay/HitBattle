import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import MediumButton from '../components/MediumButton';
import { useState } from 'react';
import { Artist } from '../types';
import { useNavigate } from 'react-router-dom';

const NextArtist = () => {
    const navigate = useNavigate();
    const [selectedArtist, setSelectedArtist] = useState<any>(null);
    const artist1 = JSON.parse(localStorage.getItem('artist1') || '{}');

    const handleArtistSelect = (artist: Artist) => {
        setSelectedArtist(artist);
        localStorage.setItem('artist2', JSON.stringify(artist));
    }

    const handleNextArtist = () => {
        setSelectedArtist(null);
        navigate('/nextartist');
    }

    return (
        <HomeContainer>
            <SearchBarContainer>
                <h1>...Now choose another.</h1>
                <SearchBar />
            </SearchBarContainer>
            <PrevAndCurrentArtistContainer>
                <CurrentArtistContainer>
                    <h2>Previous Artist</h2>
                    <CurrentArtist>
                        <img src={artist1.picture_medium} width='100' height='100' />
                        <h3>{artist1.name}</h3>
                    </CurrentArtist>
                </CurrentArtistContainer>
                {selectedArtist && (
                    <CurrentArtistContainer>
                            <h2>Current Artist</h2>
                            <CurrentArtist>
                                <img src={selectedArtist.picture_medium} width='100' height='100' />
                                <h3>{selectedArtist.name}</h3>
                            </CurrentArtist>
                    </CurrentArtistContainer>
                )}
            </PrevAndCurrentArtistContainer>
            {selectedArtist && <MediumButton title='Next Artist' onClick={() => {
                handleNextArtist();
            }} />}
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

const CurrentArtistContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50;
    margin-bottom: 2rem;
    `

const CurrentArtist = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h3 {
        margin: 0;
        margin-bottom: 1rem;
    }
    `

const PrevAndCurrentArtistContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 3rem;
    `