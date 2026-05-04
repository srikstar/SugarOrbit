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
                state.push(action.payload)
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.find(i =>
                i._id === action.payload._id &&
                i.selectedSize === action.payload.selectedSize
            )
            if (item) item.quantity += 1
        },
        decreaseQuantity: (state, action) => {
            const index = state.findIndex(i =>
                i._id === action.payload._id &&
                i.selectedSize === action.payload.selectedSize
            )
            if (index !== -1) {
                if (state[index].quantity === 1) {
                    state.splice(index, 1)   // remove if qty hits 0
                } else {
                    state[index].quantity -= 1
                }
            }
        },
        removeItem: (state, action) => {
            return state.filter(i =>
                !(i._id === action.payload._id &&
                  i.selectedSize === action.payload.selectedSize)
            )
        }
    }
})

export const { setCartData, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer