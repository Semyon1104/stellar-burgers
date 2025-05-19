describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.waitForApp();
    cy.wait('@getIngredients', { timeout: 10000 });
    cy.wait('@getUser', { timeout: 10000 });
    // Проверяем, что приложение загрузилось
    cy.get('[data-testid="burger-constructor"]', { timeout: 10000 }).should('exist');
  });

  it('should add ingredient to constructor', () => {
    cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get('[data-testid="burger-constructor"]').should('contain', 'Выберите начинку');
  });

  it('should open ingredient modal', () => {
    cy.get('[data-testid="ingredient-item"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
  });

  it('should close modal when clicking overlay', () => {
    cy.get('[data-testid="ingredient-item"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order', () => {
    // Проверяем, что пользователь авторизован
    cy.get('[data-testid="burger-constructor"]').should('exist');
    
    // Добавляем булку
    cy.get('[data-testid="ingredient-item"]').first().find('button').click();
    cy.get('[data-testid="burger-constructor"]').should('not.contain', 'Выберите булки');

    // Добавляем начинку
    cy.get('[data-testid="ingredient-item"]').eq(1).find('button').click();
    cy.get('[data-testid="burger-constructor"]').should('not.contain', 'Выберите начинку');

    // Мокаем запрос на создание заказа
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    // Проверяем, что кнопка создания заказа активна
    cy.get('[data-testid="order-button"]').should('be.visible').and('not.be.disabled').click();
    
    // Ждем ответа от сервера
    cy.wait('@createOrder');
    
    // Проверяем, что модальное окно с номером заказа открылось
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').should('contain', '12345');
  });
}); 