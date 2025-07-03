import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAllEntries = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const registerNewEntry = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
}

const deleteEntry = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

const updateEntry = (id, newNumber) => {
    return axios
        .patch(`${baseUrl}/${id}`, {number: newNumber})
        .then(response => response.data)
}

export default {
    getAllEntries,
    registerNewEntry,
    deleteEntry,
    updateEntry
}