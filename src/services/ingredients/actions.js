import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@services/api';

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
