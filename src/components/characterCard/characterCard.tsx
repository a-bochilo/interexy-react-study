import styled from "@emotion/styled";
import { Avatar, Card, Typography } from "@mui/material";

import { ICharacterData } from "../../api/characterApi/characterApi";

interface ICharacterCardProps {
    characterData: ICharacterData;
    handleClick: () => void;
}

const StyledCard = styled(Card)`
    width: 350px;
    background-color: lightgreen;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    cursor: pointer;
`;

const CharacterCard = ({ characterData, handleClick }: ICharacterCardProps) => {
    const { name, image } = characterData;

    return (
        <StyledCard onClick={handleClick}>
            <Avatar alt={name} src={image} sx={{ width: 100, height: 100 }} />
            <Typography variant="h5" align="right">
                {name}
            </Typography>
        </StyledCard>
    );
};

export default CharacterCard;
