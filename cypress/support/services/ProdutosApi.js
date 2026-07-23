class ProdutosApi {
  cadastrar(produto, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: { Authorization: token },
      body: produto,
      failOnStatusCode: false,
    });
  }

  listar(params = {}) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`,
      qs: params,
    });
  }
}

export default new ProdutosApi();
