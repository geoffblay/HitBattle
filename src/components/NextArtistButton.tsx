import styled from 'styled-components';

const NextArtistButton = () => {
    return (
        <ArtistButton>Next Artist</ArtistButton>
    )
}

export default NextArtistButton

const ArtistButton = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        color: #000;
    }
  `
