import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.redux.js'
import authReducer from './user.auth.js'

const loadAuth = () => {
  try {
    const saved = localStorage.getItem('authState')
    return saved ? JSON.parse(saved) : undefined
  } catch { return undefined }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
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