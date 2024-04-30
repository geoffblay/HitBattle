import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { searchArtists } from '../api/SearchArtists';
import { set } from 'firebase/database';
import { Artist } from '../types';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [searching, setSearching] = useState<boolean>(false);

    useEffect(() => {
        search();
    }, [searchQuery]);

    const search = async () => {
        searchArtists(searchQuery).then(data => {
            const artists = data['data'].map((artist: any) => {
                return {
                    id: artist.id,
                    name: artist.name,
                    picture_medium: artist.picture_medium,
                }
            });
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
            {searching ? (
                <p>Searching...</p>
            ) : (
                <ul>
                    {searchResults.map((artist, index) => (
                        <li key={index}>
                            {/* <img src={artist.picture_medium} width='50' height='50' /> */}
                            {artist.name}
                        </li>
                    ))}
                </ul>
            )
        }

            
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