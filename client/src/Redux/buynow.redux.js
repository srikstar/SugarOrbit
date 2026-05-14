import { createSlice } from '@reduxjs/toolkit'

const buyNowSlice = createSlice({
  name: 'buynow',
  initialState: {
    product: null,
    weight: '',
    quantity: 1,
    image: '',
    price: 0,
  },
  reducers: {
    setBuyNow: (state, action) => {
      const { product, weight, quantity } = action.payload
      state.product  = product
      state.weight   = weight
      state.quantity = quantity
      state.image    = product?.productImages?.[0] || ''
      state.price    = product?.productPrice?.find(p => p.size === weight)?.price || 0
    },
    clearBuyNow: (state) => {
      state.product  = null
      state.weight   = ''
      state.quantity = 1
      state.image    = ''
      state.price    = 0
    }
  }
})

export const { setBuyNow, clearBuyNow } = buyNowSlice.actions
export default buyNowSlice.reducer