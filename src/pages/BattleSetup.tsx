import styled from "styled-components"
import ArtistBox from "../components/ArtistBox"
import { Artist } from "../types"
import swords from '../assets/sword-cross.svg'

const BattleSetup = () => {
    const artist1: Artist = JSON.parse(localStorage.getItem('artist1') || '{}');
    const artist2: Artist = JSON.parse(localStorage.getItem('artist2') || '{}');

    return (
        <BattleSetupContainer>
            <ArtistContainer>
                <ArtistBox selectedArtist={artist1} title={null} size="large"/>
                <Swords src={swords} width='50' height='50'/>
                <ArtistBox selectedArtist={artist2} title={null} size="large"/>
            </ArtistContainer>
        </BattleSetupContainer>
    )
}

export default BattleSetup

const BattleSetupContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 3rem;
    `

const ArtistContainer = styled.div`
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    `

const Swords = styled.img`
    margin-top: 5rem;
    `