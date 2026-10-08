import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import { createOrder } from '@services/order/actions';
import { INGREDIENT_TYPES } from '@utils/ingredient-types';

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: { bun: null, ingredients: [] },
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.ingredients,
    selectIngredientCounts: createSelector(
      [(state) => state.bun, (state) => state.ingredients],
      (bun, ingredients) => {
        const counts = {};
        if (bun) counts[bun._id] = 2;
        ingredients.forEach((ingredient) => {
          counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
        });
        return counts;
      }
    ),
    selectTotalPrice: createSelector(
      [(state) => state.bun, (state) => state.ingredients],
      (bun, ingredients) =>
        (bun ? bun.price * 2 : 0) +
        ingredients.reduce((total, ingredient) => total + ingredient.price, 0)
    ),
  },
  reducers: {
    addIngredient: {
      prepare: (ingredient) => ({
        payload:
          ingredient.type === INGREDIENT_TYPES.BUN
            ? ingredient
            : { ...ingredient, constructorId: nanoid() },
      }),
      reducer: (state, action) => {
        if (action.payload.type === INGREDIENT_TYPES.BUN) {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const [ingredient] = state.ingredients.splice(dragIndex, 1);

      state.ingredients.splice(hoverIndex, 0, ingredient);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.constructorId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  },
});

export const { addIngredient, moveIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorBun,
  selectConstructorIngredients,
  selectIngredientCounts,
  selectTotalPrice,
} = burgerConstructorSlice.selectors;
