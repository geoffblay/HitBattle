import styled from "styled-components"

interface ArtistPicProps {
    pic: string;
    width: string;
    height: string;
}

const ArtistPic = ({ pic, width, height }: ArtistPicProps) => {
    return (
        <ArtistPicContainer>
            <img src={pic} width={width} height={height} />
        </ArtistPicContainer>
    )
}

export default ArtistPic

const ArtistPicContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue;
    `
