import styled from 'styled-components';

const SearchBar = () => {
    return (
        <SearchInput type='text' placeholder='Search' />
    )
}

export default SearchBar

const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid #000;
    border-radius: 20px;
    width: 600px;
    `