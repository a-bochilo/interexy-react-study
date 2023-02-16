import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_URL = `${BASE_URL}/api/`;

const $api = axios.create({
    headers: {
        "Content-type": "application/json",
    },
    baseURL: API_URL,
});

$api.interceptors.response.use((response) => {
    if (response.status === 200) {
        console.log("Api: fetched successful");
    }
    return response;
});

export default $api;
