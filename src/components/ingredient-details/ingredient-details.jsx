import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.content}>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={`${styles.title} text text_type_main-medium`}>{ingredient.name}</h3>
      <ul className={styles.details_list}>
        <li className={styles.detail_item}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.detail_item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.detail_item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.detail_item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
