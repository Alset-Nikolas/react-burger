import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient-section.module.css';

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
          <li key={item._id}>
            <button
              className={styles.ingredient_card}
              type="button"
              onClick={() => onIngredientClick(item)}
            >
              {ingredientCounts[item._id] ? (
                <Counter count={ingredientCounts[item._id]} />
              ) : null}
              <img
                className={styles.ingredient_image}
                src={item.image}
                alt={item.name}
              />
              <div className={styles.price_row}>
                <p className={`${styles.price} text text_type_digits-default`}>
                  {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p className={`${styles.ingredient_name} text text_type_main-default`}>
                {item.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
