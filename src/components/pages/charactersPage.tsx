import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Grid, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
    fetchCharacters,
    setCharacterByData,
} from "../../reducers/charactersSlice";
import { ICharacterData } from "../../api/characterApi/characterApi";

import CharacterCard from "../characterCard/characterCard";

const MyGrid = styled(Grid)`
    justify-content: space-evenly;

    button {
        margin: 30px;
        width: 100%;
    }
`;

const CharactersPage = () => {
    const isInitialLoading = useRef(true);
    const dispatch = useAppDispatch();
    const { characters, charactersFetchingStatus } = useAppSelector(
        ({ characters }: RootState) => characters
    );

    const [charactersToShow, setCharactersToShow] = useState<
        ICharacterData[] | null
    >();

    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        if (!isInitialLoading.current || !!characters.length) return;
        dispatch(fetchCharacters());
        isInitialLoading.current = false;
    }, [dispatch, characters.length]);

    useEffect(() => {
        setCharactersToShow(characters.slice(0, 20));
    }, [characters]);

    const handleLoadMore = () => {
        if (!characters) return;
        setCharactersToShow((prev) => {
            return prev
                ? [...prev, ...characters.slice(prev.length, prev.length + 20)]
                : [...characters.slice(0, 20)];
        });
    };

    const handleChoseCharacter = (character: ICharacterData) => {
        dispatch(setCharacterByData(character));
        navigate(`/characters/${character.id}`);
    };

    const showCharactersList = (charactersToShow: ICharacterData[]) => {
        return (
            <MyGrid container spacing={2} p={1}>
                {charactersToShow.map((character: ICharacterData) => (
                    <Grid key={character.id} item>
                        <CharacterCard
                            characterData={character}
                            handleClick={() => handleChoseCharacter(character)}
                        />
                    </Grid>
                ))}
                <Button
                    color="success"
                    variant="contained"
                    onClick={handleLoadMore}
                    disabled={charactersFetchingStatus === "loading"}
                >
                    {t("buttons.loadMore")}...
                </Button>
            </MyGrid>
        );
    };

    return (
        <>
            {charactersFetchingStatus === "loading" && <CircularProgress />}
            {charactersToShow && showCharactersList(charactersToShow)}
        </>
    );
};

export default CharactersPage;
