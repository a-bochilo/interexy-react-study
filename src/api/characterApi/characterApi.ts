import $api from "../api";
import { AxiosResponse } from "axios";

export interface ICharacterData {
    id: number;
    name: string;
    image: string;
    gender: string;
    location: string;
    species: string;
    status: string;
    url: string;
}

interface ICharacterIncomingData extends Omit<ICharacterData, "location"> {
    location: { name: string };
}

const mapCharacterData = (
    character: ICharacterIncomingData
): ICharacterData => ({
    ...character,
    location: character.location.name,
});

export const getCharacterById = async (id: number) => {
    try {
        const { data } = await $api.get<
            any,
            AxiosResponse<ICharacterIncomingData, any>,
            any
        >(`/character/${id}`);
        return mapCharacterData(data);
    } catch {
        console.error("Fetch character by id failure");
    }
};

export const getCharactersByIdArr = async (id: number[]) => {
    try {
        const { data } = await $api.get<
            any,
            AxiosResponse<ICharacterIncomingData[], any>,
            any
        >(`/character/${id}`);
        return data.map((character) => mapCharacterData(character));
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
                        results: ICharacterIncomingData[];
                    },
                    any
                >,
                any
            >(`/character${url}`);
            const results = data.results.map((character) =>
                mapCharacterData(character)
            );
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
