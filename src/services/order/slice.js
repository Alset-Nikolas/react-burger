import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './actions';

export const orderSlice = createSlice({
  name: 'order',
  initialState: { error: null, number: null, status: 'idle' },
  selectors: {
    selectOrder: (state) => state,
  },
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

export const { selectOrder } = orderSlice.selectors;
