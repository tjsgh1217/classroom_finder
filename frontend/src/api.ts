import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default API;
