import axios from 'axios'
import BACKEND_URL from './config'
import { getAuth } from "firebase/auth";

const user = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})



