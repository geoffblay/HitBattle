import styled from 'styled-components';
import { app } from '../firebase/firebaseConfig';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MediumButton from '../components/MediumButton';
import { getUserResults } from '../firebase/GetUserResults';
import { useState } from 'react';
import { Battle } from '../types';
import ResultList from '../components/ResultList';

const Account = () => {
    const navigate = useNavigate();

    const [userResults, setUserResults] = useState<Battle[]>([]);

    useEffect(() => {
        const auth = getAuth(app);
        const user = auth.currentUser;

        const _getUserResults = async () => {
            const results = await getUserResults(user);
            setUserResults(results);
        }

        _getUserResults();
    }, []);

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            }
        });
    }, []);

    const handleSignOut = () => {
        const auth = getAuth(app);
        auth.signOut().then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <AccountContainer>
            <AccountBanner>
                Your Account
            </AccountBanner>
            <ResultListContainer>
                <ResultListText>Your Recent Battles</ResultListText>
                <ResultList
                    battles={userResults}
                    limit={5}
                    onBattleSelect={() => {}} 
                />
            </ResultListContainer>
            <SignoutButtonContainer>
                <MediumButton onClick={handleSignOut} title='Sign Out'></MediumButton>
            </SignoutButtonContainer>
        </AccountContainer>
    )
}

export default Account

const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SignoutButtonContainer = styled.div`
`

const AccountBanner = styled.h1`
    margin-top: 2rem;
    font-size: 3rem;
`

const ResultListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
`

const ResultListText = styled.h2`
    font-size: 1.5rem;
    margin: 0;
`