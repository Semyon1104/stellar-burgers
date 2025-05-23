import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Params, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>();
  const { ingredients, loading, error } = useSelector(
    (state: RootState) => state.burger
  );

  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
