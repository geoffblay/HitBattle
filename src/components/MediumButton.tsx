import styled from 'styled-components';

interface ButtonProps {
    // title: string;
    isactive?: string;
    onClick: () => void;
}

interface TitledButtonProps extends ButtonProps {
    title: string;
}

const MediumButton = ({ title, isactive="true", onClick }: TitledButtonProps) => {
    return (
        <Button isactive={isactive} onClick={onClick}>{title}</Button>
    )
}

export default MediumButton

const Button = styled.button<ButtonProps>`
    padding: 10px 20px;
    background-color: ${props => (props.isactive === "true") ? '#000' : '#ccc'};
    color: ${props => (props.isactive === "true") ? '#fff' : '#888'};
    border: ${props => (props.isactive === "true") ? '2px solid #000' : '2px solid #ccc'};
    border-radius: 20px;
    cursor: ${props => (props.isactive === "true") ? 'pointer' : 'default'};

    &:hover {
        background-color: ${props => (props.isactive === "true") ? '#fff' : '#ccc'};
        color: ${props => (props.isactive === "true") ? '#000' : '#888'};
    }
    margin-top: 1rem;
`