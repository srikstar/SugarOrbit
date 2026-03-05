import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.redux.js'
import authReducer from './user.auth.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})

export default store