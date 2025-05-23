import { SELECTORS } from '../support/selectors';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.waitForApp();
    cy.wait('@getIngredients', { timeout: 10000 });
    cy.wait('@getUser', { timeout: 10000 });
    // Проверяем, что приложение загрузилось
    cy.get(SELECTORS.BURGER_CONSTRUCTOR, { timeout: 10000 }).should('exist');
  });

  it('should add ingredient to constructor', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().trigger('dragstart');
    cy.get(SELECTORS.BURGER_CONSTRUCTOR).trigger('drop');
    cy.get(SELECTORS.BURGER_CONSTRUCTOR).should('contain', 'Выберите начинку');
  });

  it('should open ingredient modal', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
    cy.get(SELECTORS.MODAL).should('be.visible');
  });

  it('should close modal when clicking overlay', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('should create order', () => {
    // Проверяем, что пользователь авторизован
    cy.get(SELECTORS.BURGER_CONSTRUCTOR).should('exist');
    
    // Добавляем булку
    cy.get(SELECTORS.INGREDIENT_ITEM).first().find('button').click();
    cy.get(SELECTORS.BURGER_CONSTRUCTOR).should('not.contain', 'Выберите булки');

    // Добавляем начинку
    cy.get(SELECTORS.INGREDIENT_ITEM).eq(1).find('button').click();
    cy.get(SELECTORS.BURGER_CONSTRUCTOR).should('not.contain', 'Выберите начинку');

    // Мокаем запрос на создание заказа
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    // Проверяем, что кнопка создания заказа активна
    cy.get(SELECTORS.ORDER_BUTTON).should('be.visible').and('not.be.disabled').click();
    
    // Ждем ответа от сервера
    cy.wait('@createOrder');
    
    // Проверяем, что модальное окно с номером заказа открылось
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get(SELECTORS.MODAL).should('contain', '12345');
  });
}); 