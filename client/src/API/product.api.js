import axios from 'axios'
import BACKEND_URL from './config'

const product = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})

export const getProduct = async ({ category, id }) => {  // 👈 fixed typo: categeory → category
    try {
        const response = await product.get(`/api/product/${category}/${id}`)
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}