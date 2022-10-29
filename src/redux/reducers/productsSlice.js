import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// get products api from  server;

const apiLink = `https://fakestoreapi.com/products`;
export const getProducts = createAsyncThunk("getProducts", async(_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const products = await axios.get(`${apiLink}`).then(res => res.data);
        return products.map(pro => ({...pro, checked :false, expand: false, quantity: 0, size: "sm"}));

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//   get one product 

export const getProductInfo = createAsyncThunk("getProductInfo", async(id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
        const product = await axios.get(`${apiLink}/${id}`).then(res => res.data);
        return product;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// get tabs products

export const getTabsProducts = createAsyncThunk("getTabsProducts", async(value, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        let products = [];
        if(value === "all") {
            products = await axios.get(apiLink).then(res => res.data);
            return products.map(pro => ({...pro, checked :false, expand: false, quantity: 0, size: "sm"}));
        } else {
            products = await axios.get(`${apiLink}/category/${value}`).then(res => res.data);
            return products.map(pro => ({...pro, checked :false, expand: false, quantity: 0, size: "sm"}));
        }

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// fetch related prouducts

export const getRelatedProducts = createAsyncThunk("getRelatedProducts", async(value, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {

        const products = await axios.get(`${apiLink}/category/${value}`).then(res => res.data);
            return products.map(pro => ({...pro, checked :false, expand: false, quantity: 0, size: "sm"}));

    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        tabsProducts: [],
        relatedProducts: [],
        isLoading: false,
        isError: null,
        productInfo: {quantity:0, size: "sm"}
    },

    reducers: {
        setChecked: (state, action) => {
            const {product, check} = action.payload;
            let newPro = state.products.find(p => p.id === product.id);
            let index = state.products.findIndex(p => p.id === product.id);
            newPro.checked = check;
            state.products[index] = newPro  
        },

        handleExpand: (state, action) => {
            const {product, id} = action.payload;
            let newPro = state.products.find(p => p.id === id);
            let index = state.products.findIndex(p => p.id === id);
            newPro.expand = !product.expand;
            state.products[index] = newPro;
        },

        handleQuantity: (state, action) => {
            let {among} = action.payload;
            let newObj = Object.assign({}, state.productInfo, {quantity: among});
                state.productInfo = newObj;
        },

        handleSize: (state, action) => {
            let {productSize} = action.payload;
            let newObj = Object.assign({}, state.productInfo, {size: productSize});
                state.productInfo = newObj;
    }
},

    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [getProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },

        // get related products
        [getRelatedProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getRelatedProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.relatedProducts = action.payload;
        },
        [getRelatedProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },

        // product info

        [getProductInfo.pending]: (state) => {
            state.isLoading = true;
        },
        [getProductInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.productInfo = {...state.productInfo, ...action.payload};
        },
        [getProductInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },

        // get Tabs products

        [getTabsProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getTabsProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.tabsProducts = action.payload;
        },
        [getTabsProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },

    }
})

export const {setChecked, handleExpand, handleQuantity, handleSize} = productsSlice.actions
export default productsSlice.reducer;