import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

const generateUniqueId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export interface BurgerState {
  ingredients: TIngredient[];
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: BurgerState = {
  ingredients: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null
};

export { initialState };

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const id = generateUniqueId();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.constructorItems.bun = ingredient;
        } else {
          state.constructorItems.ingredients.push(ingredient);
        }
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

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerSlice.actions;

export default burgerSlice.reducer;
