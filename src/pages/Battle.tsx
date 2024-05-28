import { Track } from '../types'

const Battle = () => {
    const battleType = localStorage.getItem('battleType');
    const numTracks = localStorage.getItem('numTracks');
    const shuffle = localStorage.getItem('shuffle');
    const artist1Album = JSON.parse(localStorage.getItem('artist1Album') || '{}');
    const artist2Album = JSON.parse(localStorage.getItem('artist2Album') || '{}');

    return (
        <div>
            <h1>hey</h1>
            <button onClick={() => {
                console.log(battleType);
                console.log(numTracks);
                console.log(shuffle);
                console.log(artist1Album);
                console.log(artist2Album);

            }}>click me</button>
        </div>
    )
}

export default Battle