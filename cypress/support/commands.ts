// Prevent TypeScript from reading file as legacy script
export {};

// Prevent Cypress from failing the test when an uncaught exception occurs
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Add custom commands here
Cypress.Commands.add('waitForApp', () => {
  cy.visit('/', { timeout: 10000 });
  cy.get('[data-testid="burger-constructor"]', { timeout: 10000 }).should('exist');
});
