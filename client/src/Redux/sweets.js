import { createSlice } from "@reduxjs/toolkit";

const sweets = createSlice({
    name: 'sweets',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        setSweetsData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setSweetsData } = sweets.actions;
export default sweets.reducer;