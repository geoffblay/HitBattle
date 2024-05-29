import styled from "styled-components"
import ResultsOverlap from "../components/ResultsOverlap";
import { useEffect } from "react";
import MediumButton from "../components/MediumButton";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

const Results = () => {
    const db = getFirestore();

    const winner = JSON.parse(localStorage.getItem('winner') || '{}');
    const loser = JSON.parse(localStorage.getItem('loser') || '{}');
    const winnerScore = localStorage.getItem('winnerScore');
    const loserScore = localStorage.getItem('loserScore');
    const tie = localStorage.getItem('tie');

    const handleSaveBattle = () => {
        const col1ClickArray = JSON.parse(localStorage.getItem('col1ClickArray') || '[]');
        const col2ClickArray = JSON.parse(localStorage.getItem('col2ClickArray') || '[]');

        const saveBattle = async () => {
            const battleRef = await addDoc(collection(db, 'battles'), {
                winner,
                loser,
                winnerScore,
                loserScore,
                col1ClickArray,
                col2ClickArray,
            });

            console.log('Document written with ID: ', battleRef.id);
        }

        const saveUserBattle = async () => {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (user) {
                const userBattleRef = await addDoc(collection(db, 'users', user.uid, 'battles'), {
                    winner,
                    loser,
                    winnerScore,
                    loserScore,
                    col1ClickArray,
                    col2ClickArray,
                });

                console.log('Document written with ID: ', userBattleRef.id);
            }
        }

        saveBattle();
        saveUserBattle();
    }


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
                    title="Community Results"
                    onClick={() => {}}
                />
                <MediumButton
                    title="Save Battle"
                    onClick={handleSaveBattle}
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