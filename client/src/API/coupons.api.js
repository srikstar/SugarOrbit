import axios from 'axios'
import BACKEND_URL from './config'

const coupon = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})

export const createCouponAPI = async (couponData) => {

    try {
        const response = await coupon.post("/api/coupons/create", couponData);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong",
            }
        );
    }
};

export const applyCouponAPI = async (couponCode, cartTotal) => {
    try {
        const response = await coupon.post("/api/coupons/apply", { couponCode, cartTotal, });
        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong",
            }
        );
    }
};