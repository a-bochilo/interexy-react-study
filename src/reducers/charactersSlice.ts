import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
    getAllCharacters,
    getCharacterById,
    ICharacterData,
} from "../api/characterApi/characterApi";

type IInitialState = {
    characters: ICharacterData[];
    chosenCharacter: ICharacterData | undefined;
    charactersFetchingStatus: "idle" | "loading" | "error";
};

const initialState = {
    characters: [],
    chosenCharacter: undefined,
    charactersFetchingStatus: "idle",
} as IInitialState;

export const fetchCharacters = createAsyncThunk<ICharacterData[]>(
    "characters/fetchCharacters",
    async () => {
        return (await getAllCharacters()) as ICharacterData[];
    }
);

export const fetchCharacterById = createAsyncThunk<ICharacterData, number>(
    "characters/fetchCharacterById",
    async (id: number) => {
        return (await getCharacterById(id)) as ICharacterData;
    }
);

const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        setCharacterById: (state, action: PayloadAction<number>) => {
            state.chosenCharacter = state.characters.find(
                (character) => character.id === action.payload
            );
        },
        setCharacterByData: (state, action: PayloadAction<ICharacterData>) => {
            state.chosenCharacter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.charactersFetchingStatus = "loading";
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.charactersFetchingStatus = "idle";
                state.characters = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.charactersFetchingStatus = "error";
            });
        builder
            .addCase(fetchCharacterById.pending, (state) => {
                state.charactersFetchingStatus = "loading";
            })
            .addCase(fetchCharacterById.fulfilled, (state, action) => {
                state.charactersFetchingStatus = "idle";
                state.chosenCharacter = action.payload;
            })
            .addCase(fetchCharacterById.rejected, (state) => {
                state.charactersFetchingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = charactersSlice;

export default reducer;

export const { setCharacterById, setCharacterByData } = actions;
