import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <NavbarContainer>
            <LogoContainer>
                <Logo src={logo} alt="HitBattle logo" onClick={() => navigate('/')} />
            </LogoContainer>
            <LoginReg>
                Login/Register
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
    padding-right: 30px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
    `