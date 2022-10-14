import axios from 'axios'
const baseUrl = 'http://192.168.29.144:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const notSavedObj = {
    id: 10000,
    content: "This note is not saved to server",
    date: new Date(),
    important: false
  }
  return request.then(response => response.data.concat(notSavedObj))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}