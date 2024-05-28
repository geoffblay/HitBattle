import styled from "styled-components"
import ResultsOverlap from "../components/ResultsOverlap";
import { useEffect } from "react";
import MediumButton from "../components/MediumButton";

const Results = () => {
    const winner = JSON.parse(localStorage.getItem('winner') || '{}');
    const loser = JSON.parse(localStorage.getItem('loser') || '{}');
    const winnerScore = localStorage.getItem('winnerScore');
    const loserScore = localStorage.getItem('loserScore');
    const tie = localStorage.getItem('tie');

    useEffect(() => {
        console.log(winner);
        console.log(loser);
    }, []);

    return (
        <ResultsContainer>
            <ResultsOverlap
                winner={winner}
                loser={loser}
                height={350}
            />
            {tie && 
            <>
                <WinMessage>It's a tie!</WinMessage>
                <Score>Score: {winnerScore} - {loserScore}</Score>
            </>
            }
            {!tie && 
                <>
                    <WinMessage>{winner.name} Wins!</WinMessage>
                    <Score>Score: {winnerScore} - {loserScore}</Score>
                </>
            }
            <ButtonsContainer>
                <MediumButton
                    title="Save Battle"
                    onClick={() => {}}
                />
                <MediumButton
                    title="Community Results"
                    onClick={() => {}}
                />
            </ButtonsContainer>
        </ResultsContainer>
    )
}

export default Results

const ResultsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const WinMessage = styled.h1`
    margin: 0;
    margin-top: 3rem;
    font-size: 3rem;
`

const Score = styled.h1`
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
`