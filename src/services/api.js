import { request } from '@utils/request';

export const getIngredients = async (signal) => {
  const data = await request('/ingredients', { signal });

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error('Некорректный ответ сервера');
  }

  return data.data.map((ingredient) => ({
    ...ingredient,
    image: `${import.meta.env.BASE_URL}images/${ingredient.image.split('/').pop()}`,
    image_mobile: `${import.meta.env.BASE_URL}images/${ingredient.image_mobile.split('/').pop()}`,
    image_large: `${import.meta.env.BASE_URL}images/${ingredient.image_large.split('/').pop()}`,
  }));
};

export const createOrderRequest = async (ingredientIds) => {
  const data = await request('/orders', {
    body: JSON.stringify({ ingredients: ingredientIds }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!data.success || !data.order?.number) {
    throw new Error('Некорректный ответ сервера');
  }

  return data.order.number;
};
