import { Avatar, Card, Typography } from "@mui/material";

import { ICharacterData } from "../../api/characterApi/characterApi";

const CharacterCard = ({
    characterData,
    handleClick,
}: {
    characterData: ICharacterData;
    handleClick: () => void;
}) => {
    const { name, image } = characterData;

    return (
        <Card
            sx={{
                width: 350,
                backgroundColor: "lightgreen",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <Avatar alt={name} src={image} sx={{ width: 100, height: 100 }} />
            <Typography variant="h5" align="right">
                {name}
            </Typography>
        </Card>
    );
};

export default CharacterCard;
