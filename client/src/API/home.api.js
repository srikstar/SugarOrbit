import axios from 'axios'
import BACKEND_URL from './config'

const home = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})


export const homeSweets = async () => {
    try {
        const response = await home.get(`/api/home/sweets`)
        return response?.data

    } catch (error) {
        return error?.response?.data 
    }
}

export const homeNamkeens = async () => {
    try {
        const response = await home.get(`/api/home/namkeens`)
        return response?.data

    } catch (error) {
        return error?.response?.data 
    }
}

export const homeChocolates = async () => {
    try {
        const response = await home.get(`/api/home/chocolates`)
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}