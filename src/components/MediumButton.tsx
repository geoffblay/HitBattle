import styled from 'styled-components';

interface ButtonProps {
    // title: string;
    active?: boolean;
    onClick: () => void;
}

interface TitledButtonProps extends ButtonProps {
    title: string;
}

const MediumButton = ({ title, active=true, onClick }: TitledButtonProps) => {
    return (
        <Button active={active} onClick={onClick}>{title}</Button>
    )
}

export default MediumButton

const Button = styled.button<ButtonProps>`
    padding: 10px 20px;
    background-color: ${props => props.active ? '#000' : '#ccc'};
    color: ${props => props.active ? '#fff' : '#888'};
    border: ${props => props.active ? '2px solid #000' : '2px solid #ccc'};
    border-radius: 20px;
    cursor: ${props => props.active ? 'pointer' : 'default'};

    &:hover {
        background-color: ${props => props.active ? '#fff' : '#ccc'};
        color: ${props => props.active ? '#000' : '#888'};
    }
    margin-top: 1rem;
`