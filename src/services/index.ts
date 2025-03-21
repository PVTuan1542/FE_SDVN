import axios from 'axios';
import { baseUrl } from '../const/api';


const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
