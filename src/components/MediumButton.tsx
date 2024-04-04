import styled from 'styled-components';

interface ButtonProps {
    title: string;
    onClick: () => void;
}

const MediumButton = ({ title, onClick }: ButtonProps) => {
    return (
        <Button onClick={onClick}>{title}</Button>
    )
}

export default MediumButton

const Button = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        color: #000;
    }
  `
