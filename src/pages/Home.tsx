import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';

const Home = () => {

    return (
        <>
            <SearchBarContainer>
                <h1>Choose an artist</h1>
                <SearchBar />
                <ArtistList playlistID='1313621735' />
            </SearchBarContainer>
        </>
    )
}

export default Home

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #000;
    `