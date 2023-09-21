import { createSlice } from '@reduxjs/toolkit'

import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === itemToAdd._id
      )
      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existingItem._id
            ? { ...cartItem, qty: cartItem.qty + itemToAdd.qty }
            : cartItem
        )
      } else {
        state.cartItems = [...state.cartItems, itemToAdd]
      }

      return updateCart(state)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
