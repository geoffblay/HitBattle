import styled from 'styled-components'
import { Artist } from '../types'

interface ArtistBoxProps {
    selectedArtist: Artist;
    title: string;
}

const ArtistBox = ({ selectedArtist, title }: ArtistBoxProps) => {
  return (
    <CurrentArtistContainer>
        <h2>{title}</h2>
        <CurrentArtist>
            <img src={selectedArtist.picture_medium} width='100' height='100' />
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