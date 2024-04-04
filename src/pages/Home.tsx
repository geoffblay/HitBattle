import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import MediumButton from '../components/MediumButton';
import { useEffect, useState } from 'react';
import { Artist } from '../types';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [selectedArtist, setSelectedArtist] = useState<any>(null);

    useEffect(() => {
        localStorage.setItem('artist1', JSON.stringify(selectedArtist));
    }, [selectedArtist]);

    const handleArtistSelect = (artist: Artist) => {
        setSelectedArtist(artist);
        localStorage.setItem('artist1', JSON.stringify(artist));
    }

    const handleNextArtist = () => {
        setSelectedArtist(null);
        navigate('/nextartist');
    }

    return (
        <HomeContainer>
            <SearchBarContainer>
                <h1>Choose an artist...</h1>
                <SearchBar />
            </SearchBarContainer>
            <CurrentArtistContainer>
                {selectedArtist && (
                    <>
                        <h2>Current Artist</h2>
                        <CurrentArtist>
                            <img src={selectedArtist.picture_medium} width='100' height='100' />
                            <h3>{selectedArtist.name}</h3>
                        </CurrentArtist>
                        <MediumButton title='Next Artist' onClick={() => {
                            handleNextArtist();
                        }} />
                    </>
                )}
            </CurrentArtistContainer>
            <ArtistList playlistID='1313621735' limit={5} onArtistSelect={handleArtistSelect} selectedArtist={selectedArtist}/>
            <ArtistList playlistID='3155776842' limit={5} onArtistSelect={handleArtistSelect} selectedArtist={selectedArtist}/>
            <ArtistList playlistID='6614423884' limit={5} onArtistSelect={handleArtistSelect} selectedArtist={selectedArtist}/>
        </HomeContainer>
    )
}

export default Home

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
    width: 100%;
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
