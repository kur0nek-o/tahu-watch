import axios from 'axios'

const apiRaw = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export default apiRaw
