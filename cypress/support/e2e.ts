import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      waitForApp(): Chainable<void>;
    }
  }
} 