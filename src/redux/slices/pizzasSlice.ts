import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}
interface PizzaSliceState {
    items: PizzaItem[];
    status: string;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>('pizzas/fetchPizzasStatus', async (params) => {
    const { sortBy,
        order,
        category,
        searchValue,
        pageCount } = params
    const { data } = await axios.get<PizzaItem[]>(
        `https://65448feb5a0b4b04436c8365.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
    )
    return data
})


const initialState: PizzaSliceState = {
    items: [],
    status: '',
}


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, actions) {
            state.items = actions.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading';
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = 'error';
            state.items = []
        })
    }
})

export const pizzasSelector = (state: RootState) => state.pizzas
export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer