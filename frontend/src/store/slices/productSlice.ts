import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductInput { id: string; name: string; qty: number; rate: number }

interface ProductState { items: ProductInput[] }

const initialState: ProductState = { items: [] }

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state: ProductState, action: PayloadAction<Omit<ProductInput,'id'>>) {
      state.items.push({ id: crypto.randomUUID(), ...action.payload })
    },
    removeProduct(state: ProductState, action: PayloadAction<string>) {
      state.items = state.items.filter((p: ProductInput) => p.id !== action.payload)
    },
    resetProducts(state: ProductState) { state.items = [] }
  }
})

export const { addProduct, removeProduct, resetProducts } = productSlice.actions
export default productSlice.reducer
