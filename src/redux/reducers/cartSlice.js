import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        cartProducts: [],
        totalPrice: 0,
        totalQuantity: 0
    },

    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const findPro = state.cartProducts.find(pro => pro.id === product.id);
            // const index = state.cartProducts.findIndex(pro => pro.id === product.id);

            if (!findPro) {
                state.cartProducts.push(product);
                state.totalQuantity += product.quantity;
                if (product.quantity > 0) {
                    state.totalPrice += product.quantity * product.price;
                }
            } else {
                // state.cartProducts[index] = product;
            }
        },


        handleCartQuantity: (state, action) => {
            const {product, among} = action.payload;
            const findPro = state.cartProducts.find(pro => pro.id === product.id);
            const index = state.cartProducts.findIndex(pro => pro.id === product.id);

            findPro.quantity = among;

            state.cartProducts[index] = findPro;

            // total quantity;
            state.totalQuantity = state.cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)
            // total Price 
            state.totalPrice = state.cartProducts.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
        },

        handleCartSize: (state, action) => {
            const {product, size} = action.payload;
            const findPro = state.cartProducts.find(pro => pro.id === product.id);
            const index = state.cartProducts.findIndex(pro => pro.id === product.id);

            findPro.size = size;
            state.cartProducts[index] = findPro;
        },

        deleteProduct: (state, action) => {
            const id = action.payload;
            const product = state.cartProducts.find(pro => pro.id === id)
            state.cartProducts = state.cartProducts.filter(pro => pro.id !== id);
            state.totalQuantity -= product.quantity;
            state.totalPrice -= product.price * product.quantity;
        },

        clearAll: (state) => {
            state.cartProducts = []
        }
    }
});

export const {addToCart, handleCartQuantity, handleCartSize, deleteProduct, clearAll} = cartSlice.actions;
export default cartSlice.reducer;