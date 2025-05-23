import { render, screen } from '../../../../utils/test-utils';
import { BurgerIngredientUI } from '../burger-ingredient';
import { mockIngredient } from '../../../../utils/mock-data';
import { Location } from 'react-router-dom';

const mockLocation: Location = {
  pathname: '/constructor',
  search: '',
  hash: '',
  state: null,
  key: 'default'
};
const mockLocationState = { background: mockLocation };

describe('BurgerIngredientUI', () => {
  it('renders ingredient with correct name and price', () => {
    render(
      <BurgerIngredientUI
        ingredient={mockIngredient}
        count={0}
        handleAdd={() => {}}
        locationState={mockLocationState}
      />
    );

    expect(screen.getByText(mockIngredient.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockIngredient.price}`)).toBeInTheDocument();
  });

  it('shows counter when count is greater than 0', () => {
    render(
      <BurgerIngredientUI
        ingredient={mockIngredient}
        count={2}
        handleAdd={() => {}}
        locationState={mockLocationState}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not show counter when count is 0', () => {
    render(
      <BurgerIngredientUI
        ingredient={mockIngredient}
        count={0}
        handleAdd={() => {}}
        locationState={mockLocationState}
      />
    );

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('calls handleAdd when add button is clicked', () => {
    const handleAdd = jest.fn();
    render(
      <BurgerIngredientUI
        ingredient={mockIngredient}
        count={0}
        handleAdd={handleAdd}
        locationState={mockLocationState}
      />
    );

    screen.getByRole('button').click();
    expect(handleAdd).toHaveBeenCalledWith(mockIngredient);
  });

  it('renders ingredient image with correct alt text', () => {
    render(
      <BurgerIngredientUI
        ingredient={mockIngredient}
        count={0}
        handleAdd={() => {}}
        locationState={mockLocationState}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockIngredient.image);
    expect(image).toHaveAttribute('alt', mockIngredient.name);
  });

  it('renders link with correct path', () => {
    render(
      <BurgerIngredientUI
        ingredient={mockIngredient}
        count={0}
        handleAdd={() => {}}
        locationState={mockLocationState}
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/ingredients/${mockIngredient._id}`);
  });
}); 