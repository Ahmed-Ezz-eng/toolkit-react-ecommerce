import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get categories api from  server;

const apiLink = `https://fakestoreapi.com/products`;
export const getCategories = createAsyncThunk("getCategories", async(_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const allCategories = await axios.get(`${apiLink}/categories`).then(res => res.data);
        allCategories.unshift("all");

        return allCategories;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// get One category 

export const getCateoryProducts = createAsyncThunk("getCateoryProducts", async(category, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    
    try {

        if (category === "all") {
            const data =  await axios.get(apiLink).then(res => res.data);
            
            return data.map(pro => ({...pro, quantity: 0, size: "sm"})).slice(0, 12);
        } else {
            const getOneCategory = await axios.get(`${apiLink}/category/${category}`).then(res => res.data);

            return getOneCategory.map(cate => ({...cate, quantity: 0, size: "sm"}));
        }

    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const featuresSlice = createSlice({
    name: "categories",
    initialState: {
        isLoading: false,
        isError: false,
        categories: [],
        categoriesData: []
    },

    reducers: {
        handleRating: (state, action) => {
            const {category, value} = action.payload;
            const findPro = state.categoriesData.find(el => el.id === category.id);
            const index = state.categoriesData.findIndex(el => el.id === category.id);
            findPro.rating.rate = value;
            state.categoriesData[index] = findPro;
    }
    },
    
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.isLoading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },

        // get One category
        [getCateoryProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getCateoryProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.categoriesData = action.payload;

        },
        [getCateoryProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
    }
});

export const {handleRating} = featuresSlice.actions
export default featuresSlice.reducer;