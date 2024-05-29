import styled from "styled-components"
import ResultsOverlap from "../components/ResultsOverlap";
import ResultList from "../components/ResultList";
import MediumButton from "../components/MediumButton";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getCommunityResults } from "../firebase/getCommunityResults";
import { useEffect, useState } from "react";
import { Battle } from "../types";

const Results = () => {
    const navigate = useNavigate();

    const db = getFirestore();
    const auth = getAuth(app);
    const user: User | null = auth.currentUser;

    const winner = JSON.parse(localStorage.getItem('winner') || '{}');
    const loser = JSON.parse(localStorage.getItem('loser') || '{}');
    const winnerScore = localStorage.getItem('winnerScore');
    const loserScore = localStorage.getItem('loserScore');
    const tie = localStorage.getItem('tie');
    const [communityResults, setCommunityResults] = useState<Battle[]>([]);

    useEffect(() => {
        const getResults = async () => {
            const communityResults = await getCommunityResults(winner, loser);
            setCommunityResults(communityResults);
        }

        getResults();
    }, [winner, loser]);

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
        navigate('/account');
    }


    return (
        <ResultsContainer>
            <ResultsOverlap
                winner={winner}
                loser={loser}
                height={350}
            />
            {tie === 'true' && 
            <>
                <WinMessage>It's a tie!</WinMessage>
                <Score>Score: {winnerScore} - {loserScore}</Score>
            </>
            }
            {tie === 'false' && 
                <>
                    <WinMessage>{winner.name} Wins!</WinMessage>
                    <Score>Score: {winnerScore} - {loserScore}</Score>
                </>
            }
            <ButtonsContainer>
                <MediumButton
                    title="Save Battle"
                    onClick={handleSaveBattle}
                    isactive={user ? 'true' : 'false'}
                />
                {!user && <p>Sign in to save your battle!</p>}
            </ButtonsContainer>
            <ResultListContainer>
                <ResultListText>Community Results</ResultListText>
                <ResultList
                    battles={communityResults}
                    limit={5}
                    onBattleSelect={() => {}}
                />
            </ResultListContainer>
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
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const ResultListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`

const ResultListText = styled.h2`
    font-size: 1.5rem;
    margin: 0;
`