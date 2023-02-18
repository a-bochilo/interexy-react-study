import { Autocomplete, TextField, Box } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
    getAllCharacters,
    ICharacterData,
} from "../../api/characterApi/characterApi";

const SearchCharacter = () => {
    const [charactersData, setCharactersData] = useState<
        null | ICharacterData[]
    >();
    const isInitialFetching = useRef<boolean>(true);
    const navigate = useNavigate();
    const { t } = useTranslation("", {
        keyPrefix: "aside.searchCharacter",
    });

    const getAndSetCharactersList = () => {
        if (!isInitialFetching.current) return;
        getAllCharacters().then((fetchedData: ICharacterData[] | undefined) => {
            if (!fetchedData) return;
            setCharactersData(fetchedData);
        });
        isInitialFetching.current = false;
    };

    const autocompleteProps = {
        options: charactersData ?? [],
        getOptionLabel: (option: ICharacterData) => option?.name ?? t("stub"),
    };

    return (
        <>
            <Autocomplete
                {...autocompleteProps}
                disablePortal
                clearOnBlur
                renderOption={(props, { name, id }: ICharacterData) => (
                    <Box
                        {...props}
                        key={id}
                        component="li"
                        sx={{ "& > img": { mr: 3, flexShrink: 0 } }}
                        onClick={() => {
                            navigate(`/characters/${id}`);
                        }}
                    >
                        {name}
                    </Box>
                )}
                renderInput={(characters) => (
                    <TextField {...characters} label={t("inputLabel")} />
                )}
                onFocus={getAndSetCharactersList}
            />
        </>
    );
};

export default SearchCharacter;
