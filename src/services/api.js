import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://rocketrn.onrender.com' // 'http://localhost:3333'
})
