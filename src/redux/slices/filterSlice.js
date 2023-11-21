import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setFilter(state, action) {
            state.sort = action.payload.sort
            state.pageCount = Number(action.payload.pageCount)
            state.categoryId = Number(action.payload.categoryId)
        },
    }
})

export const { setCategory, setSort, setPageCount, setFilter } = filterSlice.actions
export default filterSlice.reducer