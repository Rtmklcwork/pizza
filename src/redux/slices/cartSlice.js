import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            state.items.push(action.payload)
        },
        deletePizzas(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearCart(state, action) {
            state.items = []
        },
    }
})

export const { addProduct, deletePizzas, clearCart } = cartSlice.actions
export default cartSlice.reducer