import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/ingredients-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getIngredients(signal);
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось загрузить ингредиенты');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: { error: null, items: [], status: 'idle' },
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
