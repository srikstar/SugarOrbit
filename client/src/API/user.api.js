import axios from 'axios'
import BACKEND_URL from './config'

const user = axios.create({
    baseURL : BACKEND_URL,
    withCredentials :true
})

export const getUser = async() =>{
    try {
        const response = await user.get('/api/users/get-user')
        return response?.data
    } catch (error) {
        return error.response?.data || { message: "Something went wrong" }
    }
}


export const editUser = async({name,email,phoneno}) =>{
    try {
        const response = await user.post('/api/users/edit-user', {name,email,phoneno})
        return response?.data
    } catch (error) {
        return error.response?.data || { message: "Something went wrong" }
    }
}

