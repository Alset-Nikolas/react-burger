import { createSelector } from '@reduxjs/toolkit';

export const selectIngredients = (state) => state.ingredients.items;
export const selectIngredientsError = (state) => state.ingredients.error;
export const selectIngredientsStatus = (state) => state.ingredients.status;
export const selectConstructorBun = (state) => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state) =>
  state.burgerConstructor.ingredients;
export const selectSelectedIngredient = (state) => state.ingredientDetails.item;
export const selectOrder = (state) => state.order;

export const selectIngredientCounts = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => {
    const counts = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    ingredients.forEach((ingredient) => {
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });

    return counts;
  }
);

export const selectTotalPrice = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) =>
    (bun ? bun.price * 2 : 0) +
    ingredients.reduce((total, ingredient) => total + ingredient.price, 0)
);
