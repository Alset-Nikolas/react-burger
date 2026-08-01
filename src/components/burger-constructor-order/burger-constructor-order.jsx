import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor-order.module.css';

export const BurgerConstructorOrder = ({ hasIngredients, onOrderClick, totalPrice }) => {
  return (
    <div className={styles.order}>
      <div className={styles.total}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        disabled={!hasIngredients}
        htmlType="button"
        type="primary"
        size="large"
        onClick={onOrderClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
