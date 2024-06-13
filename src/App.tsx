import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NextArtist from './pages/NextArtist'
import 'normalize.css'
import { createGlobalStyle } from 'styled-components'
import BattleSetup from './pages/BattleSetup'
import Login from './pages/Login'
import Account from './pages/Account'
import Battle from './pages/Battle'
import Results from './pages/Results'

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nextartist" element={<NextArtist />} />
                <Route path="/battlesetup" element={<BattleSetup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'DM Sans', sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
    }
`
