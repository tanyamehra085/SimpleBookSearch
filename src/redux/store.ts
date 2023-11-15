import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "./reducers/menuSlice"


export const store = configureStore({
    reducer:{
        book: BookSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;