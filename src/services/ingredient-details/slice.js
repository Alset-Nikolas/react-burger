import { createSlice } from '@reduxjs/toolkit';

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState: { item: null },
  selectors: {
    selectSelectedIngredient: (state) => state.item,
  },
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

export const { selectSelectedIngredient } = ingredientDetailsSlice.selectors;
