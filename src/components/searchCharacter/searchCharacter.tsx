import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Autocomplete, TextField, Box } from "@mui/material";

import { useAppDispatch, useAppSelector, RootState } from "../../store";
import { fetchCharacters } from "../../reducers/charactersSlice";
import { ICharacterData } from "../../api/characterApi/characterApi";

const SearchCharacter = () => {
    const dispatch = useAppDispatch();
    const { characters, charactersFetchingStatus } = useAppSelector(
        ({ characters }: RootState) => characters
    );

    const navigate = useNavigate();
    const { t } = useTranslation("", {
        keyPrefix: "aside.searchCharacter",
    });

    const handleFocus = () => {
        if (!characters.length) dispatch(fetchCharacters());
    };

    const autocompleteProps = {
        options: characters ?? [],
        getOptionLabel: (option: ICharacterData) => option?.name ?? t("stub"),
    };

    return (
        <>
            <Autocomplete
                {...autocompleteProps}
                loading={charactersFetchingStatus === "loading"}
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
                onFocus={handleFocus}
            />
        </>
    );
};

export default SearchCharacter;
