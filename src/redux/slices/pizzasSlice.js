import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params, thunkAPI) => {
    const { sortBy,
        order,
        category,
        searchValue,
        pageCount } = params
    const { data } = await axios.get(
        `https://65448feb5a0b4b04436c8365.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
    )
    console.log(thunkAPI);
    return data

})


const initialState = {
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
    extraReducers: {
        [fetchPizzas.pending](state) {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled](state, action) {
            state.items = action.payload
            state.status = ': fulfilled'
        },
        [fetchPizzas.rejected](state) {
            state.status = ': error'
            state.items = []
        },
    }
})

export const pizzasSelector = (state) => state.pizzas
export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer