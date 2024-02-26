import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';

const Home = () => {

    return (
        <HomeContainer>
            <SearchBarContainer>
                <h1>Choose an artist</h1>
                <SearchBar />
            </SearchBarContainer>
            <ArtistList playlistID='1313621735' limit={5}/>
            <ArtistList playlistID='3155776842' limit={5}/>
            <ArtistList playlistID='6614423884' limit={5}/>
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