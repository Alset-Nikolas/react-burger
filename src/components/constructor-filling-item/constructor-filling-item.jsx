import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './constructor-filling-item.module.css';

export const ConstructorFillingItem = ({ ingredient, onRemoveIngredient }) => {
  return (
    <li className={styles.fillings_item}>
      <div className={styles.drag_button}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        handleClose={() => onRemoveIngredient(ingredient.constructorId)}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
};
