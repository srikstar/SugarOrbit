import axios from 'axios'
import BACKEND_URL from './config'

const chocolate = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})


export const getChocolates = async ({ low = 0, high = 10000, type = [], page = 1 } = {}) => {
    try {
        const params = new URLSearchParams()

        params.set('page', page)
        params.set('limit', 6)
        params.set('minPrice', low)
        params.set('maxPrice', high)

        if (Array.isArray(type)) {
            type.forEach(t => params.append('productType', t))
        } else if (type) {
            params.set('productType', type)
        }

        const response = await chocolate.get(`/api/product/chocolates?${params.toString()}`)
        return response?.data

    } catch (error) {
        return error?.response?.data 
    }
}