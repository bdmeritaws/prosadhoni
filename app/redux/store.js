import {configureStore} from "@reduxjs/toolkit";
import productSlice from "@/app/redux/product/productSlice";

export const store = configureStore({
    reducer: {
        products: productSlice,
    }
});