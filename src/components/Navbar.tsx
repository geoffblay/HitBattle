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
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
    display: flex;
    border: 1px solid #000;
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