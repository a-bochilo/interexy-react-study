import $api from "../api";
import { AxiosResponse } from "axios";

export interface ICharacterData {
    id: number;
    name: string;
    image: string;
    gender: string;
    location: { name: string };
    species: string;
    status: string;
    url: string;
}

// const mapCharacterData = (character: ICharacterData) => ({
//     ...character,
//     location: character.location.name,
// });

export const getCharacterById = async (id: number) => {
    try {
        const { data } = await $api.get<
            any,
            AxiosResponse<ICharacterData, any>,
            any
        >(`/character/${id}`);
        return data;
    } catch {
        console.error("Fetch character by id failure");
    }
};

export const getCharactersByIdArr = async (id: number[]) => {
    try {
        const { data } = await $api.get<
            any,
            AxiosResponse<ICharacterData[], any>,
            any
        >(`/character/${id}`);
        return data;
    } catch {
        console.error("Fetch characters by id's array failure");
    }
};

export const getAllCharacters = async () => {
    const allCharacters: ICharacterData[] = [];
    const getCharactersPage = async (url: string = "") => {
        if (url === "0") url = "";
        try {
            const { data } = await $api.get<
                any,
                AxiosResponse<
                    {
                        info: { next: string | null };
                        results: ICharacterData[];
                    },
                    any
                >,
                any
            >(`/character${url}`);
            const results = data.results;
            return results;
        } catch {
            console.error("Fetch all characters failure");
        }
    };
    const promiseArr: Promise<ICharacterData[] | undefined>[] = [];
    for (let i = 2; i < 43; i++) {
        promiseArr.push(getCharactersPage(`/?page=${i}`));
    }
    await Promise.all(promiseArr).then((resultsArr) => {
        resultsArr.forEach((arr) => {
            if (!arr) return;
            allCharacters.push(...arr);
        });
    });
    return allCharacters;
};
