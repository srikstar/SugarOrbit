import { createSlice } from '@reduxjs/toolkit'

const productSlicer = createSlice({
    name : 'product',
    initialState : [],
    reducers : {
        setProduct : (state, actions) => {
            return actions.payload
        }
    }
})

export const { setProduct } = productSlicer.actions
export default productSlicer.reducer