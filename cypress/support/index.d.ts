/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      intercept(
        method: string,
        url: string,
        response?: any
      ): Chainable<null>;
    }
  }
}

export {}; 