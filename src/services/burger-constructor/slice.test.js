import { describe, expect, it } from 'vitest';

import {
  addIngredient,
  burgerConstructorReducer,
  moveIngredient,
  removeIngredient,
  removeBun,
  selectIngredientCounts,
  selectTotalPrice,
} from './slice';

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

describe('bun replacement and removal', () => {
  it('replaces both bun halves and resets their count when removed', () => {
    let state = burgerConstructorReducer(undefined, addIngredient(bun));
    state = burgerConstructorReducer(state, addIngredient(filling));
    const replacement = { ...bun, _id: 'replacement', price: 200 };
    state = burgerConstructorReducer(state, addIngredient(replacement));
    expect(selectIngredientCounts({ burgerConstructor: state })).toEqual({
      replacement: 2,
      'filling-id': 1,
    });
    expect(selectTotalPrice({ burgerConstructor: state })).toBe(450);
    state = burgerConstructorReducer(state, removeBun());
    expect(selectIngredientCounts({ burgerConstructor: state })).toEqual({
      'filling-id': 1,
    });
    expect(selectTotalPrice({ burgerConstructor: state })).toBe(50);
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

  it('memoizes derived values when unrelated state changes', () => {
    const counts = selectIngredientCounts(state);
    expect(selectIngredientCounts({ ...state, order: { status: 'loading' } })).toBe(
      counts
    );
  });

  it('calculates counters and total price from constructor state', () => {
    expect(selectIngredientCounts(state)).toEqual({ 'bun-id': 2, 'filling-id': 2 });
    expect(selectTotalPrice(state)).toBe(300);
  });
});
