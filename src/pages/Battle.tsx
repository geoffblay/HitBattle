import { useEffect, useState } from 'react';
import { Track, Artist } from '../types'
import { getAlbumTracks } from '../api/GetAlbumTracks'
import { getArtistTopTracks } from '../api/GetArtistTopTracks'
import styled from 'styled-components';
import ArtistBox from "../components/ArtistBox"
import swords from '../assets/sword-cross.svg'
import TrackMatchup from '../components/TrackMatchup';
import MediumButton from '../components/MediumButton';
import { useNavigate } from 'react-router-dom';

const Battle = () => {
    const placeholderTrack: Track = {
        id: '',
        title: '',
        picture_medium: '',
        contributors: []
    }

    const navigate = useNavigate();

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

    const [track1ClickArray, setTrack1ClickArray] = useState<boolean[]>(Array(Number(numTracks)).fill(false));
    const [track2ClickArray, setTrack2ClickArray] = useState<boolean[]>(Array(Number(numTracks)).fill(false));

    const [finishReady, setFinishReady] = useState(false);

    useEffect(() => {
        if (battleType === 'Top Tracks') {
            const fetchTracks = async () => {
                const artist1Tracks = await getArtistTopTracks(artist1, Number(numTracks));
                const artist2Tracks = await getArtistTopTracks(artist2, Number(numTracks));

                const slicedArtist1Tracks = artist1Tracks.slice(0, Number(numTracks));
                const slicedArtist2Tracks = artist2Tracks.slice(0, Number(numTracks));

                setArtist1Tracks(slicedArtist1Tracks);
                setArtist2Tracks(slicedArtist2Tracks);
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

                const slicedArtist1Tracks = artist1Tracks.slice(0, Number(numTracks));
                const slicedArtist2Tracks = artist2Tracks.slice(0, Number(numTracks));

                setArtist1Tracks(slicedArtist1Tracks);
                setArtist2Tracks(slicedArtist2Tracks);
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

    useEffect(() => {
        const numSelected = track1ClickArray.reduce((acc, curr) => acc + Number(curr), 0) + track2ClickArray.reduce((acc, curr) => acc + Number(curr), 0);
        if (numSelected === Number(numTracks)) {
            setFinishReady(true);
        } else {
            setFinishReady(false);
        }
    }, [track1ClickArray, track2ClickArray]);

    const handleFinish = () => {
        const artist1Score = track1ClickArray.reduce((acc, curr) => acc + Number(curr), 0);
        const artist2Score = track2ClickArray.reduce((acc, curr) => acc + Number(curr), 0);

        // localStorage.setItem('winner', artist1Score > artist2Score ? JSON.stringify(artist1) : JSON.stringify(artist2));
        // localStorage.setItem('loser', artist1Score > artist2Score ? JSON.stringify(artist2) : JSON.stringify(artist1));

        let winner: Artist = artist1;
        let loser: Artist = artist2;
        let winnerScore = 0;
        let loserScore = 0;
        let tie = false;
        if (artist1Score > artist2Score) {
            winner = artist1;
            loser = artist2;
            winnerScore = artist1Score;
            loserScore = artist2Score;
        } else if (artist2Score > artist1Score) {
            winner = artist2;
            loser = artist1;
            winnerScore = artist2Score;
            loserScore = artist1Score;
        } else {
            tie = true;
            winner = artist1;
            loser = artist2;
            winnerScore = artist1Score;
            loserScore = artist2Score;
        }

        localStorage.setItem('winner', JSON.stringify(winner));
        localStorage.setItem('loser', JSON.stringify(loser));
        localStorage.setItem('tie', tie.toString());
        localStorage.setItem('winnerScore', winnerScore.toString());
        localStorage.setItem('loserScore', loserScore.toString());

        navigate('/results')
    }

    if (artist1Tracks.length === 0 || artist2Tracks.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <BattleContainer>
            <ArtistContainer>
                <ArtistBox selectedArtist={artist1} title={null} size="large"/>
                <Swords src={swords} width='50' height='50'/>
                <ArtistBox selectedArtist={artist2} title={null} size="large"/>
            </ArtistContainer>
            <MatchupsContainer>
                {artist1Tracks.map((track, index) => (
                    <TrackMatchup 
                        key={index} 
                        track1={track} 
                        track2={shuffledArtist2Tracks[index] || placeholderTrack}
                        track1ClickArray={track1ClickArray}
                        track2ClickArray={track2ClickArray}
                        setTrack1ClickArray={setTrack1ClickArray}
                        setTrack2ClickArray={setTrack2ClickArray}
                        index={index}
                    />
                ))}
            </MatchupsContainer>
            <MediumButton title='Finish Battle' isactive={finishReady.toString()} onClick={() => {
                handleFinish();
            }}/>
        </BattleContainer>
    )
}

export default Battle

const BattleContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `

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
    align-items: center;
    width: 75%;
    `