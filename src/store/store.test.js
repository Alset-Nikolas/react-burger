import { describe, expect, it } from 'vitest';

import {
  addIngredient,
  burgerConstructorReducer,
  moveIngredient,
  removeIngredient,
} from './burger-constructor-slice';
import { selectIngredientCounts, selectTotalPrice } from './selectors';

const bun = { _id: 'bun-id', name: 'Булка', price: 100, type: 'bun' };
const filling = { _id: 'filling-id', name: 'Начинка', price: 50, type: 'main' };

describe('burgerConstructor reducer', () => {
  it('sets a bun and stores separately identified filling instances', () => {
    let state = burgerConstructorReducer(undefined, addIngredient(bun));
    state = burgerConstructorReducer(state, addIngredient(filling));
    state = burgerConstructorReducer(state, addIngredient(filling));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0].constructorId).not.toEqual(
      state.ingredients[1].constructorId
    );
  });

  it('removes and reorders fillings by their constructor identity', () => {
    let state = burgerConstructorReducer(undefined, addIngredient(filling));
    state = burgerConstructorReducer(
      state,
      addIngredient({ ...filling, _id: 'second-id' })
    );
    state = burgerConstructorReducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    state = burgerConstructorReducer(
      state,
      removeIngredient(state.ingredients[0].constructorId)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('filling-id');
  });
});

describe('burger selectors', () => {
  const state = {
    burgerConstructor: {
      bun,
      ingredients: [
        { ...filling, constructorId: 'first' },
        { ...filling, constructorId: 'second' },
      ],
    },
  };

  it('calculates counters and total price from constructor state', () => {
    expect(selectIngredientCounts(state)).toEqual({ 'bun-id': 2, 'filling-id': 2 });
    expect(selectTotalPrice(state)).toBe(300);
  });
});
