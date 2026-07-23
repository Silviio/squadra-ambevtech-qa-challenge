class UsuariosApi {
  cadastrar(usuario) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: usuario,
      failOnStatusCode: false,
    });
  }
}

export default new UsuariosApi();
