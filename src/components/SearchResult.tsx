import styled from 'styled-components'
import { Artist } from '../types'

interface SearchResultProps {
    artist: Artist;
}

const SearchResult = ({ artist }: SearchResultProps) => {
    return (
        <SearchResultContainer>
            <ArtistName>{artist.name}</ArtistName>
        </SearchResultContainer>
    )
}

export default SearchResult

const SearchResultContainer = styled.div`
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    padding: 10px;
    padding-left: 0.5rem;
    border-radius: 20px;

    &:hover {
        background-color: #f0f0f0;
    }

    cursor: pointer;
    `

const ArtistName = styled.h3`
    margin: 0;
    `