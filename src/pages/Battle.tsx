import { useEffect, useState } from 'react';
import { Track } from '../types'
import { getAlbumTracks } from '../api/GetAlbumTracks'
import { getArtistTopTracks } from '../api/GetArtistTopTracks'
import styled from 'styled-components';
import ArtistBox from "../components/ArtistBox"
import swords from '../assets/sword-cross.svg'
import TrackMatchup from '../components/TrackMatchup';

const Battle = () => {
    const placeholderTrack: Track = {
        id: '',
        title: 'i hate thuis',
        picture_medium: '',
        contributors: []
    }

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
            const fetchTracks = async () => {
                const artist1Tracks = await getArtistTopTracks(artist1, Number(numTracks));
                const artist2Tracks = await getArtistTopTracks(artist2, Number(numTracks));

                setArtist1Tracks(artist1Tracks);
                setArtist2Tracks(artist2Tracks);
            }

            fetchTracks();
        } else if (battleType === 'Random') {
            const fetchTracks = async () => {
                const artist1Tracks = await getArtistTopTracks(artist1, 100);
                const artist2Tracks = await getArtistTopTracks(artist2, 100);

                const shuffledArtist1Tracks = artist1Tracks.sort(() => Math.random() - 0.5).slice(0, Number(numTracks));
                const shuffledArtist2Tracks = artist2Tracks.sort(() => Math.random() - 0.5).slice(0, Number(numTracks));

                setArtist1Tracks(shuffledArtist1Tracks);
                setArtist2Tracks(shuffledArtist2Tracks);
            }

            fetchTracks();
        } else if (battleType === 'Album') {
            const fetchTracks = async () => {
                const artist1Tracks = await getAlbumTracks(artist1Album);
                const artist2Tracks = await getAlbumTracks(artist2Album);

                setArtist1Tracks(artist1Tracks);
                setArtist2Tracks(artist2Tracks);
            }

            fetchTracks();
        }
    }, []);

    useEffect(() => {
        if (shuffle) {
            setShuffledArtist1Tracks(artist1Tracks.sort(() => Math.random() - 0.5));
        }
        console.log(shuffledArtist1Tracks);
    }, [artist1Tracks]);

    useEffect(() => {
        if (shuffle) {
            setShuffledArtist2Tracks(artist2Tracks.sort(() => Math.random() - 0.5));
        }
    }, [artist2Tracks]);

    if (artist1Tracks.length === 0 || artist2Tracks.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <ArtistContainer>
                <ArtistBox selectedArtist={artist1} title={null} size="large"/>
                <Swords src={swords} width='50' height='50'/>
                <ArtistBox selectedArtist={artist2} title={null} size="large"/>
            </ArtistContainer>
            <MatchupsContainer>
                {artist1Tracks.map((track, index) => (
                    <TrackMatchup key={index} track1={track} track2={artist2Tracks[index] || placeholderTrack}/>
                ))}
            </MatchupsContainer>
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

const MatchupsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    `