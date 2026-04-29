import { createSlice } from '@reduxjs/toolkit'

const chocolateSlice = createSlice({
    name: 'chocolates',
    initialState: [],
    reducers: {
        setChocolateData: (state, action) => {
            return action.payload
        }
    }
})

export const { setChocolateData } = chocolateSlice.actions
export default chocolateSlice.reducer