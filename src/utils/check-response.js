export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return response.json();
};
