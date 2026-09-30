import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState: { item: null },
  reducers: {
    clearSelectedIngredient: (state) => {
      state.item = null;
    },
    selectIngredient: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { clearSelectedIngredient, selectIngredient } =
  ingredientDetailsSlice.actions;
export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
