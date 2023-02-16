import { useRef, useState, useEffect } from "react";

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

    useEffect(() => {
        if (isInitialLoading.current) {
            getAllCharacters().then(
                (fetchedData: ICharacterData[] | undefined) => {
                    if (!fetchedData) return;
                    setCharactersData(fetchedData);
                }
            );
            isInitialLoading.current = false;
        }
    }, []);

    return (
        <>
            {charactersData && (
                <Grid
                    container
                    spacing={2}
                    p={1}
                    sx={{ justifyContent: "space-evenly" }}
                >
                    {charactersData.map((character: ICharacterData) => (
                        <Grid key={character.id} item>
                            <CharacterCard characterData={character} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default CharactersLayout;
