import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import { ConstructorFillingItem } from '@components/constructor-filling-item/constructor-filling-item';

import styles from './burger-constructor-content.module.css';

export const BurgerConstructorContent = ({
  bun,
  fillings,
  onRemoveIngredient,
}) => {
  return (
    <section className={styles.burger_constructor}>
      {bun ? (
        <div className={styles.constructor_element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : null}

      <div className={`${styles.fillings_list} custom-scroll`}>
        <ul className={styles.fillings_items}>
          {fillings.map((item) => (
            <ConstructorFillingItem
              key={item.constructorId}
              ingredient={item}
              onRemoveIngredient={onRemoveIngredient}
            />
          ))}
        </ul>
      </div>

      {bun ? (
        <div className={styles.constructor_element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : null}
    </section>
  );
};
