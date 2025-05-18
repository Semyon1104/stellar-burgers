import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

// Функция для генерации уникального ID
const generateUniqueId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

// Типы для состояния
interface BurgerState {
  ingredients: TIngredient[];
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: BurgerState = {
  ingredients: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null
};

// Асинхронный экшен для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

// Слайс
const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push({
          ...ingredient,
          id: generateUniqueId()
        });
      }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const [removed] = ingredients.splice(dragIndex, 1);
      ingredients.splice(hoverIndex, 0, removed);
      state.constructorItems.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  }
});

// Экспортируем действия и редьюсер
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerSlice.actions;

export default burgerSlice.reducer;
