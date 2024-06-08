import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { searchArtists } from '../api/SearchArtists';
import { Artist } from '../types';
import SearchResult from './SearchResult';
import { Search } from 'react-router-dom';

interface SearchBarProps {
    onArtistSelect: (artist: Artist) => void;
}

const SearchBar = ({ onArtistSelect }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [searching, setSearching] = useState<boolean>(false);

    useEffect(() => {
        if (searchQuery) {
            search();
        }
    }, [searchQuery]);

    const search = async () => {
        searchArtists(searchQuery).then((artists) => {
            const limitedArtists = artists.slice(0, 5);
            setSearchResults(limitedArtists);
            setSearching(false);
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setSearching(true);
    }

            
    return (
        <div>
            <SearchInput 
                type='text' 
                placeholder='Search' 
                value={searchQuery}
                onChange={handleInputChange}
            />
            {searchQuery && searching ? (
                <p>Searching...</p>
            ) : (
                searchQuery && searchResults.map((artist, index) => (
                    <SearchResultContainer
                        onClick={() => {
                            onArtistSelect(artist);
                            setSearchQuery('');
                        }}
                    >
                        <SearchResult 
                            key={index} 
                            artist={artist} 
                        />
                    </SearchResultContainer>
                ))
            )}
        </div>
    )
}

export default SearchBar

const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid #000;
    border-radius: 20px;
    width: 600px;
    `

const SearchResultContainer = styled.div`
`