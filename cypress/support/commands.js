import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('login', (email, senha) => {
  LoginPage.visitar();
  LoginPage.login(email, senha);
  cy.get('[data-testid="logout"]').should('be.visible');
});
