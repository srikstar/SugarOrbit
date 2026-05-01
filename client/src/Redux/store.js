import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.redux.js'
import authReducer from './user.auth.js'
import sweetReducer from './sweets.redux.js'
import homeReducer from './home.js'
import namkeensReducer from './namkeens.redux.js'
import chocolateReducer from './chocolates.redux.js'

const loadAuth = () => {
  try {
    const saved = localStorage.getItem('authState')
    return saved ? JSON.parse(saved) : undefined
  } catch { return undefined }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    sweets: sweetReducer,
    home : homeReducer,
    namkeens : namkeensReducer,
    chocolates : chocolateReducer
  },
  preloadedState: {
    auth: loadAuth()
  }
})

store.subscribe(() => {
  try {
    const { auth } = store.getState()
    localStorage.setItem('authState', JSON.stringify(auth))
  } catch { }
})

export default store