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

export const fetchIngredients = async ({
  abortController,
  setError,
  setIngredients,
  setIsLoading,
}) => {
  try {
    setIsLoading(true);
    setError('');

    const ingredientsData = await getIngredients(abortController.signal);
    setIngredients(ingredientsData);
  } catch (fetchError) {
    if (fetchError.name === 'AbortError') {
      return;
    }

    setError(fetchError.message || 'Не удалось загрузить ингредиенты');
  } finally {
    if (!abortController.signal.aborted) {
      setIsLoading(false);
    }
  }
};
