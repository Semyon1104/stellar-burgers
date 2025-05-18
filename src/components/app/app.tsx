import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/burgerSlice';
import { getUser } from '../../services/slices/authSlice';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { routes, modalRoutes } from '../../routes';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { loading } = useSelector((state: RootState) => state.burger);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const getModalTitle = (path: string) => {
    if (path.includes('/feed/') || path.includes('/profile/orders/')) {
      return 'Детали заказа';
    }
    if (path.includes('/ingredients/')) {
      return 'Детали ингредиента';
    }
    return '';
  };

  const getModalClosePath = (path: string) => {
    if (path.includes('/feed/')) {
      return '/feed';
    }
    if (path.includes('/profile/orders/')) {
      return '/profile/orders';
    }
    if (path.includes('/ingredients/')) {
      return '/';
    }
    return '/';
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>

      {background && (
        <Routes>
          {modalRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Modal
                  title={getModalTitle(route.path as string)}
                  onClose={() =>
                    navigate(getModalClosePath(route.path as string))
                  }
                >
                  {route.element}
                </Modal>
              }
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
