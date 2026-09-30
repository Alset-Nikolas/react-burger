import { settings } from '../settings/config';

export const getIngredients = async (signal) => {
  const response = await fetch(`${settings.burgerApiUrl}/ingredients`, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error('Некорректный ответ сервера');
  }

  return data.data;
};

export const createOrderRequest = async (ingredientIds) => {
  const response = await fetch(`${settings.burgerApiUrl}/orders`, {
    body: JSON.stringify({ ingredients: ingredientIds }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !data.order?.number) {
    throw new Error('Некорректный ответ сервера');
  }

  return data.order.number;
};
