import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createOrderRequest } from '@utils/ingredients-api';

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

const orderSlice = createSlice({
  name: 'order',
  initialState: { error: null, number: null, status: 'idle' },
  reducers: {
    resetOrder: (state) => {
      state.error = null;
      state.number = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null;
        state.number = null;
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.number = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
