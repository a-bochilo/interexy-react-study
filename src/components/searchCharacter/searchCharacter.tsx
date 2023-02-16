import { Avatar, Autocomplete, TextField, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllCharacters,
    ICharacterData,
} from "../../api/characterApi/characterApi";

const SearchCharacter = () => {
    const [charactersData, setCharactersData] = useState<
        null | ICharacterData[]
    >();
    const navigate = useNavigate();

    const getAndSetCharactersList = () => {
        getAllCharacters().then((fetchedData: ICharacterData[] | undefined) => {
            if (!fetchedData) return;
            setCharactersData(fetchedData);
        });
    };

    const autocompleteProps = {
        options: charactersData ?? [],
        getOptionLabel: (option: ICharacterData) =>
            option?.name ?? "Still fetching...",
    };

    return (
        <>
            <Autocomplete
                {...autocompleteProps}
                disablePortal
                clearOnBlur
                renderOption={(props, { name, image, id }: ICharacterData) => (
                    <Box
                        component="li"
                        sx={{ "& > img": { mr: 3, flexShrink: 0 } }}
                        {...props}
                        onClick={() => {
                            navigate(`/characters/${id}`);
                        }}
                    >
                        <Avatar
                            alt={name}
                            src={image}
                            sx={{ width: 20, height: 20 }}
                        />
                        {name}
                    </Box>
                )}
                renderInput={(characters) => (
                    <TextField {...characters} label="Characters" />
                )}
                onFocus={getAndSetCharactersList}
            />
        </>
    );
};

export default SearchCharacter;
