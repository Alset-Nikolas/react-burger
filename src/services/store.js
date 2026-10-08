import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor/slice';
import { ingredientDetailsSlice } from './ingredient-details/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';

export const store = configureStore({
  reducer: combineSlices(
    burgerConstructorSlice,
    ingredientDetailsSlice,
    ingredientsSlice,
    orderSlice
  ),
  devTools: import.meta.env.DEV,
});
