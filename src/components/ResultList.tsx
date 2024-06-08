import styled from "styled-components"
import ResultsOverlap from "./ResultsOverlap";
import { Battle } from "../types";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { getBattle } from "../firebase/GetBattle";
import ArtistBox from "./ArtistBox";
import TrackMatchup from "./TrackMatchup";

interface ResultListProps {
    battles: Battle[];
    limit?: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};

const ResultList = ({ battles, limit }: ResultListProps) => {
    const [open, setOpen] = useState(false);
    const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
    const handleOpen = (battle: Battle) => {
        setOpen(true);
        setSelectedBattle(battle);
    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (selectedBattle) {
            getBattle(selectedBattle.id).then(battle => {
                setSelectedBattle(battle || null);
            });
        }
    }, [selectedBattle]);

    return (
        <ResultListContainer>
            {battles.slice(0, limit).map((battle, index) => {
                return (
                    <>
                        <ResultContainer onClick={() => handleOpen(battle)}>
                            <ResultsOverlap
                                key={index}
                                winner={battle.winner}
                                loser={battle.loser}
                                height={100}
                            />
                            <Score>{battle.winnerScore} - {battle.loserScore}</Score>
                        </ResultContainer>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                {selectedBattle && (
                                        selectedBattle.artist1Tracks.map((track, index) => (
                                            <TrackMatchup 
                                                key={index} 
                                                track1={track} 
                                                track2={selectedBattle.artist2Tracks[index] || null}
                                                track1ClickArray={selectedBattle.col1ClickArray}
                                                track2ClickArray={selectedBattle.col2ClickArray}
                                                setTrack1ClickArray={() => {}}
                                                setTrack2ClickArray={() => {}}
                                                index={index}
                                            />
                                        ))
                                    )
                                }
                            </Box>
                        </Modal>
                    </>
                );
            })}
        </ResultListContainer>
    )
}

export default ResultList

const ResultListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.5rem;

    &:hover {
        background-color: rgba(0, 0, 0, 0.25);
    }
`

const Score = styled.h1`
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
    margin: 0;
    margin-top: 0.5rem;
`

const PopupColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`