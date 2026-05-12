import { createSlice } from "@reduxjs/toolkit";

const homeReducer = createSlice({
    name: "homeData",
    initialState: {
        sweets: [],
        namkeens: [],
        chocolates: [] // Added chocolates
    },

    reducers: {
        setHomeSweetData: (state, action) => {
            state.sweets = action.payload
        },
        setHomeNamkeenData: (state, action) => {
            state.namkeens = action.payload
        },
        setHomeChocolateData: (state, action) => {
            state.chocolates = action.payload
        }
    }
})

export const { setHomeSweetData, setHomeNamkeenData, setHomeChocolateData } = homeReducer.actions
export default homeReducer.reducer