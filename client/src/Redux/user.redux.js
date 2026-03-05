import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  data: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.isLoggedIn = true
      state.data = action.payload
    },
    clearUserData: () => {
      return initialState
    }
  }
})

export const { setUserData, clearUserData } = userSlice.actions
export default userSlice.reducer