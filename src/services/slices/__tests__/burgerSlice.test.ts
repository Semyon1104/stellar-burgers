import burgerReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const createConstructorIngredient = (ingredient: TIngredient, id: string): TConstructorIngredient => ({
  ...ingredient,
  id
});

describe('burgerSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    ingredients: [],
    loading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(burgerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addIngredient', () => {
    const actual = burgerReducer(initialState, addIngredient(mockIngredient));
    expect(actual.constructorItems.ingredients).toHaveLength(1);
    expect(actual.constructorItems.ingredients[0]._id).toEqual(mockIngredient._id);
  });

  it('should handle removeIngredient', () => {
    const constructorIngredient = createConstructorIngredient(mockIngredient, '1');
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [constructorIngredient]
      }
    };
    const actual = burgerReducer(stateWithIngredient, removeIngredient('1'));
    expect(actual.constructorItems.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const constructorIngredient1 = createConstructorIngredient(mockIngredient, '1');
    const constructorIngredient2 = createConstructorIngredient(
      { ...mockIngredient, _id: '2' },
      '2'
    );
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [constructorIngredient1, constructorIngredient2]
      }
    };
    const actual = burgerReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(actual.constructorItems.ingredients[0].id).toBe('2');
    expect(actual.constructorItems.ingredients[1].id).toBe('1');
  });

  it('should handle clearConstructor', () => {
    const constructorIngredient = createConstructorIngredient(mockIngredient, '1');
    const stateWithItems = {
      ...initialState,
      constructorItems: {
        bun: mockIngredient,
        ingredients: [constructorIngredient]
      }
    };
    const actual = burgerReducer(stateWithItems, clearConstructor());
    expect(actual.constructorItems.bun).toBeNull();
    expect(actual.constructorItems.ingredients).toHaveLength(0);
  });
}); 