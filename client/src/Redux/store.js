import { configureStore } from '@reduxjs/toolkit'

import sweetReducer from './sweets.js'

const store = configureStore({
    reducer:{
        sweets : sweetReducer
    }
})

export default store