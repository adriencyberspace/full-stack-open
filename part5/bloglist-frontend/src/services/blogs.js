import axios from 'axios'
const baseUrl = 'api/blogs' || 'http://localhost:3003/api/blogs'


// Don't need token yet
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const url = `${ baseUrl }/${id}`
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update, remove }