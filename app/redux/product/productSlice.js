import {createSlice, current} from "@reduxjs/toolkit";

if (typeof window !== "undefined") {
    var localStorageItem = JSON.parse(localStorage.getItem("product")) ? JSON.parse(localStorage.getItem("product")) : []
}

const initialProductState = {
    productCart: localStorageItem,
    sideBarModal: false,
    orderConfirmedModal: false,
    categorySlag: "",
    productName: "",
};

const productSlice = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {

        addToCart: (state, action) => {
            state.productCart.push(action.payload);
            let productData = JSON.stringify(current(state.productCart));
            localStorage.setItem("product", productData);
        },

        incrementToCart: (state, action) => {
            const {productId, updatedState} = action.payload;
            const isProductExist = state.productCart.filter((p) => p.product_slag === productId);
            isProductExist[0].qty = updatedState;
            let productData = JSON.stringify(current(state.productCart));
            localStorage.setItem("product", productData);
        },

        decrementToCart: (state, action) => {
            const {productId, updatedDecrementState} = action.payload;
            const isProductExist = state.productCart.filter((p) => p.product_slag === productId);
            isProductExist[0].qty = updatedDecrementState;
            let productData = JSON.stringify(current(state.productCart));
            localStorage.setItem("product", productData);
        },

        deleteSingleProduct: (state, action) => {
            const {product_slag} = action.payload;
            const filteredProduct = state.productCart.filter((p) => p.product_slag !== action.payload);
            state.productCart = filteredProduct
            let productData = JSON.stringify(filteredProduct);
            localStorage.setItem("product", productData);
        },

        modalCheck: (state, action) => {
            state.sideBarModal = action.payload;
        },

        modalCheckOrder: (state, action) => {
            state.orderConfirmedModal = action.payload;
        },

        categorySlag: (state, action) => {
            state.categorySlag = action.payload;
            state.productName = "";
        },

        productName: (state, action) => {
            state.categorySlag = "";
            state.productName = action.payload;
        },
        // 🔥 ADD THIS
    clearCart: (state) => {
        state.productCart = [];
        localStorage.removeItem("product");
    }
    }
});

export default productSlice.reducer;
export const {
    addToCart,
    incrementToCart,
    decrementToCart,
    deleteSingleProduct,
    modalCheck,
    modalCheckOrder,
    clearCart,
    categorySlag,
    productName
} = productSlice.actions;
