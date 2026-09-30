import { addIngredient, removeIngredient } from '@store/burger-constructor-slice';
import { createOrder } from '@store/order-slice';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectTotalPrice,
} from '@store/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructorContent } from '@components/burger-constructor-content/burger-constructor-content';
import { BurgerConstructorOrder } from '@components/burger-constructor-order/burger-constructor-order';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const totalPrice = useSelector(selectTotalPrice);

  const handleOrderClick = () => {
    dispatch(
      createOrder([bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id])
    );
  };

  return (
    <section className={styles.burger_constructor}>
      <BurgerConstructorContent
        bun={bun}
        fillings={ingredients}
        onAddIngredient={(ingredient) => dispatch(addIngredient(ingredient))}
        onRemoveIngredient={(constructorId) => dispatch(removeIngredient(constructorId))}
      />
      <BurgerConstructorOrder
        hasIngredients={Boolean(bun)}
        onOrderClick={handleOrderClick}
        totalPrice={totalPrice}
      />
    </section>
  );
};
