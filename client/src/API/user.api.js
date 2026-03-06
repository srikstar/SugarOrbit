import axios from 'axios'
import BACKEND_URL from './config'
import { getAuth } from "firebase/auth";

const user = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})


export const getUser = async (phoneno) => {
    try {
        const response = await user.get(`/api/users/get-user/${phoneno}`);
        return response?.data;
    } catch (error) {
        console.log(error)
        return error.response?.data || { message: "Something went wrong" };
    }
};


export const editUser = async ({ name, email, phoneno }) => {
    try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken();
        const response = await user.post("/api/users/edit-user", { name, email, phoneno },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response?.data;
    } catch (error) {
        return error.response?.data || { message: "Something went wrong" };
    }
};

