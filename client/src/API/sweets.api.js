import axios from 'axios'
import BACKEND_URL from './config'

const sweet = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})


export const getSweets = async ({ low = 0, high = 10000, type = [], page = 1 } = {}) => {
    try {
        const params = new URLSearchParams()

        params.set('page', page)
        params.set('limit', 10)
        params.set('minPrice', low)
        params.set('maxPrice', high)

        if (Array.isArray(type)) {
            type.forEach(t => params.append('productType', t))
        } else if (type) {
            params.set('productType', type)
        }

        const response = await sweet.get(`/api/product/sweets?${params.toString()}`)
        return response?.data

    } catch (error) {
        return error?.response?.data 
    }
}