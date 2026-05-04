import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.redux.js'
import authReducer from './user.auth.js'
import sweetReducer from './sweets.redux.js'
import homeReducer from './home.js'
import namkeensReducer from './namkeens.redux.js'
import chocolateReducer from './chocolates.redux.js'
import cartReducer from './cart.redux.js'

const loadState = (key) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : undefined
  } catch { return undefined }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    sweets: sweetReducer,
    home: homeReducer,
    namkeens: namkeensReducer,
    chocolates: chocolateReducer,
    cart: cartReducer
  },
  preloadedState: {
    auth: loadState('authState'),
    cart: loadState('cartState') ?? [] 
  }
})

store.subscribe(() => {
  try {
    const { auth, cart } = store.getState()
    localStorage.setItem('authState', JSON.stringify(auth))
    localStorage.setItem('cartState', JSON.stringify(cart))  // 👈 persist cart
  } catch { }
})

export default store