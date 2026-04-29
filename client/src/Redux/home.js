import { createSlice } from "@reduxjs/toolkit";

const homeReducer = createSlice({
    name: "homeData",
    initialState: {
        sweets: [],
        namkeens: []
    },

    reducers: {
        setHomeSweetData: (state, action) => {
            state.sweets = action.payload
        },
        setHomeNamkeenData: (state, action) => {
            state.namkeens = action.payload
        }
    }
})

export const { setHomeSweetData, setHomeNamkeenData } = homeReducer.actions
export default homeReducer.reducer