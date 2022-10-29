import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorites: []
    },

    reducers:{
        addToFavorites: (state, action) => {
            const {newPro} = action.payload;        
            if (newPro.checked) {
                state.favorites.push(newPro);
            }else {
                state.favorites = state.favorites.filter(el => el.id !== newPro.id);
            }
    }
}
});

export const {addToFavorites, deleteFromFav} = favoriteSlice.actions;
export default favoriteSlice.reducer;

