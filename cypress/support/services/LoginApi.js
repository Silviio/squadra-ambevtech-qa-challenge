class LoginApi {
  login(credenciais) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: credenciais,
      failOnStatusCode: false,
    });
  }
}

export default new LoginApi();
