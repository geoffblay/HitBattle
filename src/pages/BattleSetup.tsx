import styled from "styled-components"
import ArtistBox from "../components/ArtistBox"
import Dropdown from "../components/Dropdown"
import { Artist } from "../types"
import swords from '../assets/sword-cross.svg'
import { useState } from "react"


const BattleSetup = () => {
    const artist1: Artist = JSON.parse(localStorage.getItem('artist1') || '{}');
    const artist2: Artist = JSON.parse(localStorage.getItem('artist2') || '{}');
    const [battleType, setBattleType] = useState('Top Tracks');

    return (
        <BattleSetupContainer>
            <ArtistContainer>
                <ArtistBox selectedArtist={artist1} title={null} size="large"/>
                <Swords src={swords} width='50' height='50'/>
                <ArtistBox selectedArtist={artist2} title={null} size="large"/>
            </ArtistContainer>
            <Dropdown 
                label="Battle Type" options={[
                    { value: 'Top Tracks', label: 'Top Tracks' },
                    { value: 'Random', label: 'Random' },
                    { value: 'Album', label: 'Album' }
                ]} 
                value={battleType}
                onChange={(value) => {console.log(value)}}
            />
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