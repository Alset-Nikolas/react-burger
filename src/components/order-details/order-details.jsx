import { CheckMarkIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export const OrderDetails = ({ error, number, status }) => {
  if (status === 'loading') {
    return (
      <div className={styles.content}>
        <Preloader />
      </div>
    );
  }

  if (status === 'failed') {
    return <p className={`${styles.error} text text_type_main-default`}>{error}</p>;
  }

  return (
    <div className={styles.content}>
      <p className={`${styles.number} text text_type_digits-large`}>{number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={styles.icon_wrapper}>
        <div className={styles.icon}>
          <CheckMarkIcon type="primary" />
        </div>
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
