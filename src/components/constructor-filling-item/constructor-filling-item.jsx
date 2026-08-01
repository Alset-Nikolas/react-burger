import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './constructor-filling-item.module.css';

export const ConstructorFillingItem = ({
  ingredient,
  onIngredientClick,
  onRemoveIngredient,
}) => {
  return (
    <li className={styles.fillings_item}>
      <button
        type="button"
        className={styles.drag_button}
        onClick={() => onIngredientClick(ingredient)}
      >
        <DragIcon type="primary" />
      </button>
      <ConstructorElement
        handleClose={() => onRemoveIngredient(ingredient.constructorId)}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
};
