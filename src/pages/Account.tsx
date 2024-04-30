import styled from 'styled-components';
import { app } from '../firebase/firebaseConfig';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Account</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Account