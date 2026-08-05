import { useMemo } from 'react';

import { BurgerConstructorContent } from '@components/burger-constructor-content/burger-constructor-content';
import { BurgerConstructorOrder } from '@components/burger-constructor-order/burger-constructor-order';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({
  bun,
  fillings,
  onOrderClick,
  onRemoveIngredient,
}) => {
  const totalPrice = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) + fillings.reduce((sum, item) => sum + item.price, 0),
    [bun, fillings]
  );

  return (
    <section className={styles.burger_constructor}>
      <BurgerConstructorContent
        bun={bun}
        fillings={fillings}
        onRemoveIngredient={onRemoveIngredient}
      />
      <BurgerConstructorOrder
        hasIngredients={Boolean(bun) || fillings.length > 0}
        onOrderClick={onOrderClick}
        totalPrice={totalPrice}
      />
    </section>
  );
};
