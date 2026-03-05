import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    data: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setAuthData: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload
        },
        clearAuthData: () => {
            return initialState
        }
    }
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer