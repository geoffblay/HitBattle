import styled from "styled-components"
import ResultsOverlap from "../components/ResultsOverlap";

const Results = () => {
    const artist1 = JSON.parse(localStorage.getItem('artist1') || '{}');
    const artist2 = JSON.parse(localStorage.getItem('artist2') || '{}');
    const artist1Score = JSON.parse(localStorage.getItem('artist1Score') || '{}');
    const artist2Score = JSON.parse(localStorage.getItem('artist2Score') || '{}');

    return (
        <ResultsContainer>
            <ResultsOverlap
                winner={artist1Score > artist2Score ? artist1 : artist2}
                loser={artist1Score > artist2Score ? artist2 : artist1}
                height={500}
            />
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