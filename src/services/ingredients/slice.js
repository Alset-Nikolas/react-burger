import { createSlice } from '@reduxjs/toolkit';

import { fetchIngredients } from './actions';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: { error: null, items: [], status: 'idle' },
  selectors: {
    selectIngredients: (state) => state.items,
    selectIngredientsError: (state) => state.error,
    selectIngredientsStatus: (state) => state.status,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.status = 'idle';

          return;
        }

        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const { selectIngredients, selectIngredientsError, selectIngredientsStatus } =
  ingredientsSlice.selectors;
