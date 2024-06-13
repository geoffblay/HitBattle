import styled from 'styled-components'
import { Artist } from '../types'

interface ArtistBoxProps {
    selectedArtist: Artist;
    title: string | null;
    size?: 'small' | 'medium' | 'large';
}

const ArtistBox = ({ selectedArtist, title, size = 'medium' }: ArtistBoxProps) => {
    let width = 100;
    let height = 100;
    if (size === 'small') {
        width = 50;
        height = 50;
    } else if (size === 'large') {
        width = 200;
        height = 200;
    }

    return (
        <CurrentArtistContainer>
            {title && <h2>{title}</h2>}
            <CurrentArtist>
                <img src={selectedArtist.picture_medium} width={width} height={height} />
                <h3>{selectedArtist.name}</h3>
            </CurrentArtist>
        </CurrentArtistContainer>
    )
}

export default ArtistBox

const CurrentArtistContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
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