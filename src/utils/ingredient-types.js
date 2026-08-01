export const INGREDIENT_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
};

export const getIngredientByType = (ingredients, type) =>
  ingredients.find((item) => item.type === type);

export const getIngredientsByType = (ingredients, type) =>
  ingredients.filter((item) => item.type === type);

export const getNonBunIngredients = (ingredients) =>
  ingredients.filter((item) => item.type !== INGREDIENT_TYPES.BUN);
