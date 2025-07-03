import axios from "axios";
const api_key = import.meta.env.VITE_api_key
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getCityMeteo = (capital) => {
    return axios
            .get(`${baseUrl}?q=${capital}&units=metric&appid=${api_key}`)
            .then(response => response.data)
}

export default {
    getCityMeteo
}