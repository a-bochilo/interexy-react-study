import $api from "../api";
import { AxiosResponse } from "axios";

export interface ICharacterData {
    id: string;
    name: string;
    image: string;
    gender: string;
    location: { name: string };
    species: string;
    status: string;
    url: string;
}

export const getCharacterById = async (id: string) => {
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
    try {
        const { data } = await $api.get<
            any,
            AxiosResponse<
                {
                    results: ICharacterData[];
                },
                any
            >,
            any
        >(`/character`);
        return data.results;
    } catch {
        console.error("Fetch all characters failure");
    }
};
