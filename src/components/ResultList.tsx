import styled from "styled-components"
import ResultsOverlap from "./ResultsOverlap";
import { Battle } from "../types";

interface ResultListProps {
    battles: Battle[];
    limit?: number;
    onBattleSelect: (battle: Battle) => void;
}

const ResultList = ({ battles, limit, onBattleSelect }: ResultListProps) => {
  return (
    <ResultListContainer>
        {battles.slice(0, limit).map((battle, index) => {
            return (
                <ResultContainer onClick={() => {
                    onBattleSelect(battle); 
                }}>
                    <ResultsOverlap 
                        key={index}
                        winner={battle.winner}
                        loser={battle.loser}
                        height={100}
                    />
                    <Score>{battle.winnerScore} - {battle.loserScore}</Score>
                </ResultContainer>
            );
        })}
    </ResultListContainer>
  )
}

export default ResultList

const ResultListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.5rem;

    &:hover {
        background-color: rgba(0, 0, 0, 0.25);
    }
`

const Score = styled.h1`
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
    margin: 0;
    margin-top: 0.5rem;
`