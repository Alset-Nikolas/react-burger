import { createSlice, nanoid } from '@reduxjs/toolkit';

import { INGREDIENT_TYPES } from '@utils/ingredient-types';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: { bun: null, ingredients: [] },
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
});

export const { addIngredient, moveIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
