import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { DND_TYPES } from '@utils/dnd-types';

import styles from './ingredient-section.module.css';

const DraggableIngredient = ({ count, ingredient, onIngredientClick }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      item: { ingredient },
      type: DND_TYPES.INGREDIENT,
    }),
    [ingredient]
  );

  return (
    <li>
      <button
        ref={dragRef}
        className={styles.ingredient_card}
        style={{ opacity: isDragging ? 0.4 : 1 }}
        type="button"
        onClick={() => onIngredientClick(ingredient)}
      >
        {count ? <Counter count={count} /> : null}
        <img
          className={styles.ingredient_image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={styles.price_row}>
          <p className={`${styles.price} text text_type_digits-default`}>
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingredient_name} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </button>
    </li>
  );
};

export const IngredientSection = ({
  ingredientCounts,
  ingredients,
  onIngredientClick,
  sectionRef,
  title,
}) => {
  return (
    <section ref={sectionRef} className={styles.ingredients_section}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styles.ingredients_list}>
        {ingredients.map((item) => (
          <DraggableIngredient
            key={item._id}
            count={ingredientCounts[item._id]}
            ingredient={item}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </ul>
    </section>
  );
};
