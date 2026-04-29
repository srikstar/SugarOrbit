import { createSlice } from '@reduxjs/toolkit'

const namkeensSlice = createSlice({
    name: 'namkeens',
    initialState: [],
    reducers: {
        setNamkeensData: (state, action) => {
            return action.payload
        }
    }
})

export const { setNamkeensData } = namkeensSlice.actions
export default namkeensSlice.reducer