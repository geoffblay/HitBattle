import styled from "styled-components"
import ArtistBox from "../components/ArtistBox"
import Dropdown from "../components/Dropdown"
import { Artist, Track, Album } from "../types"
import swords from '../assets/sword-cross.svg'
import { useState } from "react"
import { getArtistAlbums } from "../api/GetArtistAlbums"
import { useEffect } from "react"
import CustomSwitch from "../components/Switch"
import MediumButton from "../components/MediumButton"
import { useNavigate } from "react-router-dom"
import { getAlbumTracks } from "../api/GetAlbumTracks"
import { set } from "firebase/database"

const BattleSetup = () => {
    const placeholderAlbum: Album = {
        id: '',
        title: 'placeholder',
        cover_medium: '',
        tracks: []
    }

    const navigate = useNavigate();

    const artist1: Artist = JSON.parse(localStorage.getItem('artist1') || '{}');
    const artist2: Artist = JSON.parse(localStorage.getItem('artist2') || '{}');
    const [battleType, setBattleType] = useState('Top Tracks');
    const [numTracks, setNumTracks] = useState(5);

    const [artist1Album, setArtist1Album] = useState<Album>(placeholderAlbum);
    const [artist2Album, setArtist2Album] = useState<Album>(placeholderAlbum);

    const [artist1AlbumID, setArtist1AlbumID] = useState<string>('');
    const [artist2AlbumID, setArtist2AlbumID] = useState<string>('');

    const [artist1AlbumOptions, setArtist1AlbumOptions] = useState<Album[]>([]);
    const [artist2AlbumOptions, setArtist2AlbumOptions] = useState<Album[]>([]);

    const [shuffle, setShuffle] = useState(false);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchAlbums = async () => {
            const artist1Albums = await getArtistAlbums(artist1);
            const artist2Albums = await getArtistAlbums(artist2);

            setArtist1AlbumOptions(artist1Albums);
            setArtist2AlbumOptions(artist2Albums);
        };

        fetchAlbums();
    }, []);

    useEffect(() => {
        setArtist1Album(artist1AlbumOptions[0]);
    }, [artist1AlbumOptions]);

    useEffect(() => {
        setArtist2Album(artist2AlbumOptions[0]);
    }, [artist2AlbumOptions]);

    useEffect(() => {
        setArtist1Album(artist1AlbumOptions.find((album) => album.id === artist1AlbumID) || placeholderAlbum);
    }, [artist1AlbumID]);

    useEffect(() => {
        setArtist2Album(artist2AlbumOptions.find((album) => album.id === artist2AlbumID) || placeholderAlbum);
    }, [artist2AlbumID]);

    useEffect(() => {
        if (battleType === 'Album' && artist1Album && artist2Album) {
            setReady(true);
        } else if (battleType !== 'Album') {
            setReady(true);
        } else {
            setReady(false);
        }
    }
    , [battleType, artist1Album, artist2Album]);

    const handleBattle = () => {
        localStorage.setItem('battleType', battleType);
        localStorage.setItem('numTracks', String(numTracks));
        localStorage.setItem('shuffle', String(shuffle));
        localStorage.setItem('artist1Album', JSON.stringify(artist1Album));
        localStorage.setItem('artist2Album', JSON.stringify(artist2Album));

        navigate('/battle');
    }

    
    return (
        <BattleSetupContainer>
            <ArtistContainer>
                <ArtistBox selectedArtist={artist1} title={null} size="large"/>
                <Swords src={swords} width='50' height='50'/>
                <ArtistBox selectedArtist={artist2} title={null} size="large"/>
            </ArtistContainer>
            <DropdownsContainer>
                <Dropdown 
                    label="Battle Type" 
                    options={[
                        { value: 'Top Tracks', label: 'Top Tracks' },
                        { value: 'Random', label: 'Random' },
                        { value: 'Album', label: 'Album' }
                    ]} 
                    value={battleType}
                    onChange={setBattleType}
                />
                {battleType === 'Album' && (
                    <AlbumDropdownContainer>
                        <Dropdown
                            label="Artist 1 Album" 
                            options={artist1AlbumOptions.map((album) => ({ value: album.id, label: album.title }))}
                            value={artist1Album?.id}
                            onChange={setArtist1AlbumID}
                        />
                        <Dropdown
                            label="Artist 2 Album" 
                            options={artist2AlbumOptions.map((album) => ({ value: album.id, label: album.title }))}
                            value={artist2Album?.id}
                            onChange={setArtist2AlbumID}
                        />
                    </AlbumDropdownContainer>
                )}
                <Dropdown
                    label="Number of tracks" 
                    options={Array.from({ length: 20 }, (_, i) => ({ value: i + 1, label: String(i + 1) }))}
                    value={numTracks}
                    onChange={setNumTracks}
                />
                <CustomSwitch 
                    label="Shuffle" 
                    onChange={setShuffle}
                />
            </DropdownsContainer>
            <MediumButton title='Battle!' isactive={ready.toString()} onClick={() => {
                handleBattle();
            }}/>
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

const DropdownsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    `

const AlbumDropdownContainer = styled.div`
    display: flex;
    gap: 1rem;
    `

