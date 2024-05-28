import { useEffect, useState } from 'react';
import { Track } from '../types'
import { getAlbumTracks } from '../api/GetAlbumTracks'
import { getArtistTopTracks } from '../api/GetArtistTopTracks'
import styled from 'styled-components';
import ArtistBox from "../components/ArtistBox"
import swords from '../assets/sword-cross.svg'

const Battle = () => {
    const artist1 = JSON.parse(localStorage.getItem('artist1') || '{}');
    const artist2 = JSON.parse(localStorage.getItem('artist2') || '{}');

    const battleType = localStorage.getItem('battleType');
    const numTracks = localStorage.getItem('numTracks');
    const shuffle = localStorage.getItem('shuffle');
    const artist1Album = JSON.parse(localStorage.getItem('artist1Album') || '{}');
    const artist2Album = JSON.parse(localStorage.getItem('artist2Album') || '{}');

    const [artist1Tracks, setArtist1Tracks] = useState<Track[]>([]);
    const [artist2Tracks, setArtist2Tracks] = useState<Track[]>([]);

    const [shuffledArtist1Tracks, setShuffledArtist1Tracks] = useState<Track[]>([]);
    const [shuffledArtist2Tracks, setShuffledArtist2Tracks] = useState<Track[]>([]);

    useEffect(() => {
        if (battleType === 'Top Tracks') {
            getArtistTopTracks(artist1, Number(numTracks)).then((tracks) => {
                setArtist1Tracks(tracks);
            });
            getArtistTopTracks(artist2, Number(numTracks)).then((tracks) => {
                setArtist2Tracks(tracks);
            });
        } else if (battleType === 'Random') {
            getArtistTopTracks(artist1, 100).then((tracks) => {
                const shuffledTracks = tracks.sort(() => Math.random() - 0.5).slice(0, Number(numTracks));
                setArtist1Tracks(shuffledTracks);
            });
            getArtistTopTracks(artist2, 100).then((tracks) => {
                const shuffledTracks = tracks.sort(() => Math.random() - 0.5).slice(0, Number(numTracks));
                setArtist2Tracks(shuffledTracks);
            });
        } else if (battleType === 'Album') {
            getAlbumTracks(artist1Album).then((tracks) => {
                setArtist1Tracks(tracks);
            });
            getAlbumTracks(artist2Album).then((tracks) => {
                setArtist2Tracks(tracks);
            });
        }
    }, []);

    useEffect(() => {
        if (shuffle) {
            setShuffledArtist1Tracks(artist1Tracks.sort(() => Math.random() - 0.5));
        }
    }, [artist1Tracks]);

    useEffect(() => {
        if (shuffle) {
            setShuffledArtist2Tracks(artist2Tracks.sort(() => Math.random() - 0.5));
        }
    }, [artist2Tracks]);

    return (
        <div>
            <ArtistContainer>
                <ArtistBox selectedArtist={artist1} title={null} size="large"/>
                <Swords src={swords} width='50' height='50'/>
                <ArtistBox selectedArtist={artist2} title={null} size="large"/>
            </ArtistContainer>
        </div>
    )
}

export default Battle

const ArtistContainer = styled.div`
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    `

const Swords = styled.img`
    margin-top: 5rem;
    `