import styled from "styled-components"
import { Track } from "../types"

interface TrackMatchupProps {
    track1: Track;
    track2: Track;
}

const TrackMatchup = ({ track1, track2 }: TrackMatchupProps) => {
    return (
        <TrackMatchupContainer>
            <TrackContainer>
                <TrackImage src={track1.picture_medium} />
                <TitleContributorContainer>
                    <Title>{track1.title}</Title>
                    <Contributors>
                        {track1.contributors.map((artist) => artist.name).join(', ')}
                    </Contributors>
                </TitleContributorContainer>
            </TrackContainer>
            <TrackContainer>
                <TitleContributorContainer>
                    <Title>{track2.title}</Title>
                    <Contributors>
                        {track2.contributors.map((artist) => (
                            <div key={artist.id}>{artist.name}</div>
                        ))}
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

const Title = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`

const Contributors = styled.h4`
    color: grey;
    font-size: 0.8rem;
    margin: 0;
`

