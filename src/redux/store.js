import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./reducers/productsSlice";
import favoriteSlice from "./reducers/favoriteSlice";
import featuresSlice from "./reducers/featuresSlice";
import cartSlice from "./reducers/cartSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
    reducer: {
        productsSlice,
        favoriteSlice,
        featuresSlice,
        cartSlice,
        userSlice
    },
});

export default store;
