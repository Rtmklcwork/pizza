import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
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
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setPageCount(state, action) {
            state.pageCount = action.payload
        },

    }
})

export const sortSelector = (state) => state.filter.sort
export const filterSelector = (state) => state.filter
export const { setCategory, setSort, setPageCount, setSearchValue } = filterSlice.actions
export default filterSlice.reducer