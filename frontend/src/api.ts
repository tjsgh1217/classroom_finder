import axios from 'axios';

const api = 'http://192.168.0.34:8080';

const API = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default API;
