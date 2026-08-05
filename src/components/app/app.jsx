import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { fetchIngredients } from '@utils/ingredients-api';

import styles from './app.module.css';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [constructorBun, setConstructorBun] = useState(null);
  const [constructorFillings, setConstructorFillings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    fetchIngredients({
      abortController,
      setError,
      setIngredients,
      setIsLoading,
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIngredient(null);
    setIsOrderModalOpen(false);
  }, []);

  const handleIngredientClick = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);

    if (ingredient.type === 'bun') {
      setConstructorBun(ingredient);
    } else {
      setConstructorFillings((currentFillings) => [
        ...currentFillings,
        {
          ...ingredient,
          constructorId: crypto.randomUUID(),
        },
      ]);
    }
  }, []);

  const handleOrderClick = useCallback(() => {
    setIsOrderModalOpen(true);
  }, []);

  const handleRemoveIngredient = useCallback((constructorIngredientId) => {
    setConstructorFillings((currentFillings) =>
      currentFillings.filter((item) => item.constructorId !== constructorIngredientId)
    );
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        {isLoading ? (
          <div className={styles.status}>
            <Preloader />
          </div>
        ) : error ? (
          <p className={`${styles.status} text text_type_main-default`}>{error}</p>
        ) : (
          <div className={styles.content}>
            <BurgerIngredients
              bun={constructorBun}
              constructorFillings={constructorFillings}
              ingredients={ingredients}
              onIngredientClick={handleIngredientClick}
            />
            <BurgerConstructor
              bun={constructorBun}
              fillings={constructorFillings}
              onOrderClick={handleOrderClick}
              onRemoveIngredient={handleRemoveIngredient}
            />
          </div>
        )}
      </main>
      {selectedIngredient ? (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      ) : null}
      {isOrderModalOpen ? (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
};
