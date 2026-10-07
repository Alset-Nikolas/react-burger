import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructorContent } from '@components/burger-constructor-content/burger-constructor-content';
import { BurgerConstructorOrder } from '@components/burger-constructor-order/burger-constructor-order';
import {
  addIngredient,
  removeBun,
  removeIngredient,
  selectConstructorBun,
  selectConstructorIngredients,
  selectTotalPrice,
} from '@services/burger-constructor/slice';
import { createOrder } from '@services/order/actions';
import { selectOrder } from '@services/order/slice';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const order = useSelector(selectOrder);
  const totalPrice = useSelector(selectTotalPrice);

  const handleOrderClick = () => {
    if (!bun || order.status === 'loading') return;
    dispatch(
      createOrder([bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id])
    );
  };

  return (
    <section data-testid="burger-constructor" className={styles.burger_constructor}>
      <BurgerConstructorContent
        bun={bun}
        fillings={ingredients}
        onAddIngredient={(ingredient) => dispatch(addIngredient(ingredient))}
        onRemoveBun={() => dispatch(removeBun())}
        onRemoveIngredient={(constructorId) => dispatch(removeIngredient(constructorId))}
      />
      <BurgerConstructorOrder
        hasIngredients={Boolean(bun) && order.status !== 'loading'}
        onOrderClick={handleOrderClick}
        totalPrice={totalPrice}
      />
    </section>
  );
};
