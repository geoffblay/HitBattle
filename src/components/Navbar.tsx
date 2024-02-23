import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
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

export default Navbar;

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid #000;
    padding: 10px 20px;
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
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
    `