import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addProduct(state, action) {
        //     state.items.push(action.payload)

        addProduct(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((acc, obj) => (obj.price * obj.count) + acc, 0)
        },
        plusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count++
            }
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        deleteProduct(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },
        clearCart(state, action) {
            state.items = []
            state.totalPrice = 0
        },
    }
});

export const cartSelector = (state) => state.cart
export const cartSelectorById = (id) => (state) => state.cart.items.find(obj => obj.id == id)

export const { addProduct, deleteProduct, clearCart, plusItem, minusItem } = cartSlice.actions
export default cartSlice.reducer