import styled from "styled-components"
import { Track } from "../types"
import { useState } from "react"
import { set } from "firebase/database";

interface TrackMatchupProps {
    track1: Track;
    track2: Track;
    track1ClickArray: boolean[];
    track2ClickArray: boolean[];
    setTrack1ClickArray: (newArray: boolean[]) => void;
    setTrack2ClickArray: (newArray: boolean[]) => void;
    index: number;
}

const TrackMatchup = ({ track1, track2, track1ClickArray, track2ClickArray, setTrack1ClickArray, setTrack2ClickArray, index }: TrackMatchupProps) => {
    // const [track1Clicked, setTrack1Clicked] = useState(false);
    // const [track2Clicked, setTrack2Clicked] = useState(false);

    return (
        <TrackMatchupContainer>
            <TrackContainer
                onClick={() => {
                    // setTrack1Clicked(true)
                    // setTrack2Clicked(false)
                    const newArray = [...track1ClickArray];
                    newArray[index] = true;
                    setTrack1ClickArray(newArray);
                    const newArray2 = [...track2ClickArray];
                    newArray2[index] = false;
                    setTrack2ClickArray(newArray2);
                }}
                style={{ backgroundColor: track1ClickArray[index] ? 'rgba(0, 0, 0, 0.25)' : 'initial' }}
            >
                <TrackImage src={track1.picture_medium} />
                <TitleContributorContainer>
                    <Title>{track1.title}</Title>
                    <Contributors>
                        {track1.contributors.map((artist) => artist.name).join(', ')}
                    </Contributors>
                </TitleContributorContainer>
            </TrackContainer>
            <TrackContainer
                onClick={() => {
                    // setTrack2Clicked(true)
                    // setTrack1Clicked(false)
                    const newArray = [...track2ClickArray];
                    newArray[index] = true;
                    setTrack2ClickArray(newArray);
                    const newArray2 = [...track1ClickArray];
                    newArray2[index] = false;
                    setTrack1ClickArray(newArray2);
                }}
                style={{ backgroundColor: track2ClickArray[index] ? 'rgba(0, 0, 0, 0.25)' : 'initial' }}
            >
                <TitleContributorContainer>
                    <Title>{track2.title}</Title>
                    <Contributors>
                    {track2.contributors.map((artist) => artist.name).join(', ')}
                    </Contributors>
                </TitleContributorContainer>
                <TrackImage src={track2.picture_medium} />
            </TrackContainer>
        </TrackMatchupContainer>
    )
}

export default TrackMatchup

const TrackMatchupContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 1rem;
`

const TrackContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
`

const TrackImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`

const TitleContributorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;
    margin-right: 1rem;
`

const Title = styled.h4`
    margin: 0;
    margin-bottom: 0.5rem;
`

const Contributors = styled.h4`
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    margin: 0;
`

