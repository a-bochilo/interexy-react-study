import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import SingleCharcterCard from "../singleCharacterCard/singleCharacterCard";

import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
    characterChosen,
    fetchCharacterById,
} from "../../reducers/charactersSlice";

const SingleCharcterPage = () => {
    const dispatch = useAppDispatch();
    const { characters, chosenCharacter, charactersFetchingStatus } =
        useAppSelector(({ characters }: RootState) => characters);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        if (charactersFetchingStatus === "loading") return;
        if (!characters.length) {
            console.log("fetch");
            dispatch(fetchCharacterById(+id));
        }
        if (characters.length) dispatch(characterChosen(+id));
    }, [id, dispatch]);

    return (
        <>
            {!chosenCharacter ? (
                <CircularProgress />
            ) : (
                <SingleCharcterCard character={chosenCharacter} />
            )}
        </>
    );
};

export default SingleCharcterPage;
