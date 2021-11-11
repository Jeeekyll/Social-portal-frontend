import axios from "axios"

const api = process.env.NEXT_PUBLIC_DOMAIN_API

const $api = axios.create({
  withCredentials: true, // enable auto send cookie
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${localStorage.getItem("token")}` // adding header with token
  return config
})

export default $api
