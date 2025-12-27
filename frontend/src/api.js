import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const API = axios.create({
  baseURL: apiUrl
})

export const loginUser = (data) => API.post("/api/login", data)
export const registerUser = (data) => API.post("/api/register", data)

export default API
