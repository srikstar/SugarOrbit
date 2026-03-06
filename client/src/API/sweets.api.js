import axios from 'axios'
import BACKEND_URL from './config'

const sweet = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})


export const getSweets = async ({low,high,type,page}) =>{
    try {
        const response = await sweet.get(`/api/product/sweets?page=${page}&limit=10&productType=${type}&minPrice=${low}&maxPrice=${high}`)
        return response?.data
    } catch (error) {
        return error?.message?.data
    }
}
