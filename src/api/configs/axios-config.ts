import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.API_PORT || 'http://192.168.1.5:3000'
})

function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) return error.response?.data;
  return null;
}

export {
  api, 
  getErrorMessage
}