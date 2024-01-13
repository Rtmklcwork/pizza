import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}
interface CartSliceItem {
    totalPrice: number;
    items: CartItem[];
}
const initialState: CartSliceItem = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<CartItem>) {
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
        plusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count++
            }
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },
        clearCart(state) {
            state.items = []
            state.totalPrice = 0
        },
    }
});

export const cartSelector = (state: RootState) => state.cart
export const cartSelectorById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addProduct, deleteProduct, clearCart, plusItem, minusItem } = cartSlice.actions
export default cartSlice.reducer