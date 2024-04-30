import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { app } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setDisplayName(user.displayName);
            } else {
                setUser(null);
                setDisplayName(null);
            }
        });
    }, [user, setUser]);

    const handleLoginRegClick = () => {
        if (user) {
            navigate('/account');
        } else {
            navigate('/login');
        }
    }

    return (
        <NavbarContainer>
            <LogoContainer>
                <Logo src={logo} alt="HitBattle logo" onClick={() => navigate('/')} />
            </LogoContainer>
            <LoginReg onClick={() => handleLoginRegClick()}>
                {user ? `Welcome, ${displayName}` : 'Login / Register'}
            </LoginReg>
        </NavbarContainer>
    );
};

export default NavBar;

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    padding-top: 20px;
    width: 100%;
    ` 

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    `

const Logo = styled.img`
    height: 20px;
    cursor: pointer;
    `

const LoginReg = styled.h3`
    margin-right: 2.5rem;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
    `