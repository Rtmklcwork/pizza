import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
    name: string;
    sortProperty: string;
}

interface SortSliceState {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sort: Sort;
}

const initialState: SortSliceState = {
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
        setCategory(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },

    }
})

export const sortSelector = (state: RootState) => state.filter.sort
export const filterSelector = (state: RootState) => state.filter
export const { setCategory, setSort, setPageCount, setSearchValue } = filterSlice.actions
export default filterSlice.reducer