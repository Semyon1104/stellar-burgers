import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../services/slices/ordersSlice';
import { useDispatch } from '../../services/store';
import { RootState } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.orders);
  const { ingredients } = useSelector((state: RootState) => state.burger);
  const number = Number(useParams().number);

  useEffect(() => {
    dispatch(fetchOrderByNumber(number));
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!currentOrder || !ingredients.length) return null;

    const date = new Date(currentOrder.createdAt);

    const ingredientsInfo = currentOrder.ingredients.reduce(
      (acc: { [key: string]: TIngredient & { count: number } }, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...currentOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [currentOrder, ingredients]);

  if (!orderInfo || loading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
