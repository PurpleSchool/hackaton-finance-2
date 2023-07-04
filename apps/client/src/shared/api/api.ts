import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from '~/shared/constants/localstorage';

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
  }
  return config;
});
