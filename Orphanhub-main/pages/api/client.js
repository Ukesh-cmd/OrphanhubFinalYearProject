import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3005/api'
})

export default client;