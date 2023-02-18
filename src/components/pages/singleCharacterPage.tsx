import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import SingleCharcterCard from "../singleCharacterCard/singleCharacterCard";

import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
    setCharacterById,
    fetchCharacterById,
} from "../../reducers/charactersSlice";

const SingleCharcterPage = () => {
    const dispatch = useAppDispatch();
    const { characters, chosenCharacter } = useAppSelector(
        ({ characters }: RootState) => characters
    );

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        if (chosenCharacter && chosenCharacter.id === +id) return;
        if (!characters.length) {
            dispatch(fetchCharacterById(+id));
            return;
        }
        if (characters.length) {
            dispatch(setCharacterById(+id));
            return;
        }
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
