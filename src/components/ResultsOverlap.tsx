import styled from "styled-components";
import { Artist } from "../types";

interface ResultsOverlapProps {
    winner: Artist;
    loser: Artist;
    height: number;
}

const ResultsOverlap = ({ winner, loser, height }: ResultsOverlapProps) => {
    return (
        <ResultsOverlapContainer height={height}>
            <WinnerImage src={winner.picture_medium} height={height}/>
            <LoserImage src={loser.picture_medium} height={height}/>
        </ResultsOverlapContainer>
    )
}

export default ResultsOverlap

const ResultsOverlapContainer = styled.div<{ height: number }>`
    position: relative;
    height: ${props => props.height}px;
    width: ${props => props.height * 1.5}px;
`

const WinnerImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
    border-radius: 50%;
`

const LoserImage = styled.img<{ height: number }>`
    position: absolute;
    top: 0;
    left: ${props => props.height / 2}px;
    object-fit: cover;
    z-index: 0;
    border-radius: 50%;
    opacity: 0.5;
`