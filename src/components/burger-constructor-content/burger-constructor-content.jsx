import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';

import { ConstructorFillingItem } from '@components/constructor-filling-item/constructor-filling-item';
import { DND_TYPES } from '@utils/dnd-types';

import styles from './burger-constructor-content.module.css';

export const BurgerConstructorContent = ({
  bun,
  fillings,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: DND_TYPES.INGREDIENT,
      collect: (monitor) => ({ isOver: monitor.isOver() }),
      drop: ({ ingredient }) => onAddIngredient(ingredient),
    }),
    [onAddIngredient]
  );

  return (
    <section
      ref={dropRef}
      className={`${styles.burger_constructor} ${isOver ? styles.drop_target : ''}`}
    >
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
      ) : (
        <p className={`${styles.placeholder} text text_type_main-default`}>
          Перетащите булку
        </p>
      )}

      <div className={`${styles.fillings_list} custom-scroll`}>
        {fillings.length ? (
          <ul className={styles.fillings_items}>
            {fillings.map((item, index) => (
              <ConstructorFillingItem
                key={item.constructorId}
                index={index}
                ingredient={item}
                onRemoveIngredient={onRemoveIngredient}
              />
            ))}
          </ul>
        ) : (
          <p className={`${styles.placeholder} text text_type_main-default`}>
            Перетащите начинку
          </p>
        )}
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
      ) : (
        <p className={`${styles.placeholder} text text_type_main-default`}>
          Перетащите булку
        </p>
      )}
    </section>
  );
};
