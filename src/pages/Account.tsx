import styled from 'styled-components';
import { app } from '../firebase/firebaseConfig';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MediumButton from '../components/MediumButton';

const Account = () => {
    const navigate = useNavigate();

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