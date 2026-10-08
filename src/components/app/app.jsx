import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import {
  clearSelectedIngredient,
  selectSelectedIngredient,
} from '@services/ingredient-details/slice';
import { fetchIngredients } from '@services/ingredients/actions';
import {
  selectIngredientsError,
  selectIngredientsStatus,
} from '@services/ingredients/slice';
import { resetOrder, selectOrder } from '@services/order/slice';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const ingredientsError = useSelector(selectIngredientsError);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const order = useSelector(selectOrder);

  useEffect(() => {
    const promise = dispatch(fetchIngredients());

    return () => promise.abort();
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(clearSelectedIngredient());
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        {ingredientsStatus === 'loading' || ingredientsStatus === 'idle' ? (
          <div className={styles.status}>
            <Preloader />
          </div>
        ) : ingredientsError ? (
          <p className={`${styles.status} text text_type_main-default`}>
            {ingredientsError}
          </p>
        ) : (
          <div className={styles.content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        )}
      </main>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      {order.status !== 'idle' && (
        <Modal onClose={closeModal}>
          <OrderDetails
            error={order.error}
            number={order.number}
            status={order.status}
          />
        </Modal>
      )}
    </div>
  );
};
