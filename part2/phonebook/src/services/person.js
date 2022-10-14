import axios from 'axios'

const baseUrl = 'http://192.168.29.144:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personToAdd) => {
    const request = axios.post(baseUrl, personToAdd)
    return request.then(response => response.data)
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll, create, update, del
}