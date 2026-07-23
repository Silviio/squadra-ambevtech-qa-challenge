class AdminHomePage {
  elementos = {
    linkCadastrarProdutos: () => cy.get('[data-testid="cadastrar-produtos"]'),
    linkListarProdutos: () => cy.get('[data-testid="listar-produtos"]'),
  };

  irParaCadastroDeProdutos() {
    this.elementos.linkCadastrarProdutos().click();
  }

  irParaListaDeProdutos() {
    this.elementos.linkListarProdutos().click();
  }
}

export default new AdminHomePage();
