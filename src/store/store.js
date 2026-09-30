import { configureStore } from '@reduxjs/toolkit';

import { burgerConstructorReducer } from './burger-constructor-slice';
import { ingredientDetailsReducer } from './ingredient-details-slice';
import { ingredientsReducer } from './ingredients-slice';
import { orderReducer } from './order-slice';

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
  },
});
