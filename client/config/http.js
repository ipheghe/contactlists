import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
  API_BASE_URL = 'http://localhost:8000'
} else if (process.env.NODE_ENV === 'production') {
  API_BASE_URL = 'heroku code here' 
}

const http = axios.create({
  baseURL: API_BASE_URL,
});

export default http;
