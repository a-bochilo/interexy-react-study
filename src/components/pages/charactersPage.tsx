import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import {
    getAllCharacters,
    ICharacterData,
} from "../../api/characterApi/characterApi";
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
    const [charactersData, setCharactersData] = useState<
        null | ICharacterData[]
    >();
    const [charactersToShow, setCharactersToShow] = useState<
        ICharacterData[] | null
    >();

    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        if (!isInitialLoading.current) return;
        getAllCharacters().then((fetchedData: ICharacterData[] | undefined) => {
            if (!fetchedData) return;
            setCharactersData(fetchedData);
            setCharactersToShow([...fetchedData.slice(0, 20)]);
        });
        isInitialLoading.current = false;
    }, []);

    const loadMoreHandler = () => {
        if (!charactersData) return;
        setCharactersToShow((prev) => {
            return prev
                ? [
                      ...prev,
                      ...charactersData.slice(prev.length, prev.length + 20),
                  ]
                : [...charactersData.slice(0, 20)];
        });
    };

    const showCharactersList = (charactersToShow: ICharacterData[]) => {
        return (
            <MyGrid container spacing={2} p={1}>
                {charactersToShow.map((character: ICharacterData) => (
                    <Grid key={character.id} item>
                        <CharacterCard
                            characterData={character}
                            handleClick={() =>
                                navigate(`/characters/${character.id}`)
                            }
                        />
                    </Grid>
                ))}
                <Button
                    color="success"
                    variant="contained"
                    onClick={loadMoreHandler}
                >
                    {t("buttons.loadMore")}...
                </Button>
            </MyGrid>
        );
    };

    return <>{charactersToShow && showCharactersList(charactersToShow)}</>;
};

export default CharactersPage;
