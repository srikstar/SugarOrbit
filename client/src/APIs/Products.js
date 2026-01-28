import axios from 'axios'
import { EXPRESS_URL } from './config'

const product = axios.create({
    baseURL : EXPRESS_URL,
    withCredentials : true 
})

export const sweets = async () =>{
    try {
        const response = await product.get('/products/sweets')
        return response.data.sweets
    } catch (error) {
        return error.response.data
    }
}