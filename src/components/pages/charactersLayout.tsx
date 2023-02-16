import { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";

import {
    getAllCharacters,
    ICharacterData,
} from "../../api/characterApi/characterApi";
import CharacterCard from "../characterCard/characterCard";

const CharactersLayout = () => {
    const isInitialLoading = useRef(true);
    const [charactersData, setCharactersData] = useState<
        null | ICharacterData[]
    >();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isInitialLoading.current) return;
        getAllCharacters().then((fetchedData: ICharacterData[] | undefined) => {
            if (!fetchedData) return;
            setCharactersData(fetchedData);
        });
        isInitialLoading.current = false;
    }, []);

    const showCharactersList = (charactersData: ICharacterData[]) => {
        return (
            <Grid
                container
                spacing={2}
                p={1}
                sx={{ justifyContent: "space-evenly" }}
            >
                {charactersData.map((character: ICharacterData) => (
                    <Grid key={character.id} item>
                        <CharacterCard
                            characterData={character}
                            handleClick={() =>
                                navigate(`/characters/${character.id}`)
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };

    return <>{charactersData && showCharactersList(charactersData)}</>;
};

export default CharactersLayout;
