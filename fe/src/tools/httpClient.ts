import axios, { AxiosInstance } from 'axios'

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

export default httpClient;
