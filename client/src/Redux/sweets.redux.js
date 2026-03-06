import { createSlice } from "@reduxjs/toolkit";

const sweetReducer = createSlice({
    name: "sweets",
    initialState: null,

    reducers: {
        setSweetData: (state, action) => {
            return action.payload
        }
    }
})

export const { setSweetData } = sweetReducer.actions
export default sweetReducer.reducer