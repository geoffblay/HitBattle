import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import 'normalize.css'
import { createGlobalStyle } from 'styled-components'

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
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
