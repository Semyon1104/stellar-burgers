import { render, screen, fireEvent, setupModalRoot, cleanupModalRoot } from '../../../../utils/test-utils';
import { BurgerConstructorUI } from '../burger-constructor';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const createConstructorIngredient = (ingredient: TIngredient, id: string): TConstructorIngredient => ({
  ...ingredient,
  id
});

const mockStore = configureStore({
  reducer: {
    burger: () => ({
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        ingredients: []
      }
    })
  }
});

describe('BurgerConstructorUI', () => {
  const mockOnOrderClick = jest.fn();
  const mockCloseOrderModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    setupModalRoot();
  });

  afterEach(() => {
    cleanupModalRoot();
  });

  it('renders correctly with bun and no ingredients', () => {
    render(
      <Provider store={mockStore}>
        <BurgerConstructorUI
          onOrderClick={() => {}}
          constructorItems={{
            bun: {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
              __v: 0
            },
            ingredients: []
          }}
          orderRequest={false}
          orderModalData={null}
          closeOrderModal={() => {}}
          price={2510}
        />
      </Provider>
    );

    expect(screen.getByTestId('burger-constructor')).toBeInTheDocument();
    expect(screen.getByText('Краторная булка N-200i (верх)')).toBeInTheDocument();
    expect(screen.getByText('Краторная булка N-200i (низ)')).toBeInTheDocument();
    expect(screen.getByText('Выберите начинку')).toBeInTheDocument();
    expect(screen.getByTestId('order-button')).toBeInTheDocument();
  });

  it('renders bun and ingredients when provided', () => {
    const constructorIngredient = createConstructorIngredient(mockIngredient, '1');
    render(
      <BurgerConstructorUI
        constructorItems={{
          bun: mockBun,
          ingredients: [constructorIngredient]
        }}
        onOrderClick={mockOnOrderClick}
        closeOrderModal={mockCloseOrderModal}
        orderRequest={false}
        orderModalData={null}
        price={mockBun.price * 2 + mockIngredient.price}
      />
    );

    expect(screen.getByText((content) => content === `${mockBun.name} (верх)`)).toBeInTheDocument();
    expect(screen.getByText(mockIngredient.name)).toBeInTheDocument();
  });

  it('displays correct total price', () => {
    const constructorIngredient = createConstructorIngredient(mockIngredient, '1');
    const totalPrice = mockBun.price * 2 + mockIngredient.price;
    render(
      <BurgerConstructorUI
        constructorItems={{
          bun: mockBun,
          ingredients: [constructorIngredient]
        }}
        onOrderClick={mockOnOrderClick}
        closeOrderModal={mockCloseOrderModal}
        orderRequest={false}
        orderModalData={null}
        price={totalPrice}
      />
    );

    expect(screen.getByText(totalPrice)).toBeInTheDocument();
  });

  it('calls onOrderClick when order button is clicked', () => {
    const constructorIngredient = createConstructorIngredient(mockIngredient, '1');
    render(
      <BurgerConstructorUI
        constructorItems={{
          bun: mockBun,
          ingredients: [constructorIngredient]
        }}
        onOrderClick={mockOnOrderClick}
        closeOrderModal={mockCloseOrderModal}
        orderRequest={false}
        orderModalData={null}
        price={mockBun.price * 2 + mockIngredient.price}
      />
    );

    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    expect(mockOnOrderClick).toHaveBeenCalledTimes(1);
  });

  it('disables order button when no bun is selected', () => {
    const constructorIngredient = createConstructorIngredient(mockIngredient, '1');
    render(
      <BurgerConstructorUI
        constructorItems={{
          bun: null,
          ingredients: [constructorIngredient]
        }}
        onOrderClick={mockOnOrderClick}
        closeOrderModal={mockCloseOrderModal}
        orderRequest={false}
        orderModalData={null}
        price={mockIngredient.price}
      />
    );

    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeDisabled();
  });
}); 