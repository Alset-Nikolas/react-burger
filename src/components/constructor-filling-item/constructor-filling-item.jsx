import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { moveIngredient } from '@services/burger-constructor/slice';
import { DND_TYPES } from '@utils/dnd-types';

import styles from './constructor-filling-item.module.css';

export const ConstructorFillingItem = ({ index, ingredient, onRemoveIngredient }) => {
  const dispatch = useDispatch();
  const itemRef = useRef(null);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      item: { constructorId: ingredient.constructorId, index },
      type: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    }),
    [index, ingredient.constructorId]
  );
  const [, dropRef] = useDrop(
    () => ({
      accept: DND_TYPES.CONSTRUCTOR_INGREDIENT,
      drop: (draggedItem) => {
        if (draggedItem.constructorId === ingredient.constructorId) {
          return;
        }

        dispatch(moveIngredient({ dragIndex: draggedItem.index, hoverIndex: index }));
      },
    }),
    [dispatch, index, ingredient.constructorId]
  );

  dragRef(dropRef(itemRef));

  return (
    <li
      ref={itemRef}
      className={styles.fillings_item}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
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
