// import { configureStore } from "@reduxjs/toolkit";

import filter from './slices/filterSlice.ts'
import cart from './slices/cartSlice.ts'
import pizzas from './slices/pizzasSlice.ts'
import { useDispatch } from "react-redux";

// export const store = configureStore({
//     reducer: {
//         filter,
//         cart,
//         pizzas,
//     }
// })



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'



const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    filter: filter,
    cart: cart,
    pizzas: pizzas
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

// export default store;