import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCartData: (state, action) => {
            const exists = state.find(item => 
                item._id === action.payload._id && 
                item.selectedSize === action.payload.selectedSize
            )
            if (exists) {
                exists.quantity += 1
            } else {
                state.push({ ...action.payload, quantity: 1 })
            }
        }
    }
})

export const { setCartData } = cartSlice.actions
export default cartSlice.reducer


