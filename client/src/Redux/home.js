import { createSlice } from "@reduxjs/toolkit";

const homeSweetsReducer = createSlice({
    name: "homeSweets",
    initialState: [],   

    reducers: {
        setHomeSweetData: (state, action) => {
            return action.payload || []
        }
    }
})

export const { setHomeSweetData } = homeSweetsReducer.actions
export default homeSweetsReducer.reducer