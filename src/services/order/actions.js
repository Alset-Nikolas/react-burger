import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrderRequest } from '@services/api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      return await createOrderRequest(ingredientIds);
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось оформить заказ');
    }
  }
);
