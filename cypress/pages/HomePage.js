class HomePage {
  elementos = {
    campoPesquisa: () => cy.get('[data-testid="pesquisar"]'),
    botaoPesquisar: () => cy.get('[data-testid="botaoPesquisar"]'),
    contadorCarrinho: () => cy.get('[data-testid="listaProdutos"]'),
  };

  pesquisarProduto(nome) {
    this.elementos.campoPesquisa().type(nome);
    this.elementos.botaoPesquisar().click();
  }

  adicionarProdutoNaLista(nomeProduto) {
    cy.contains('.card', nomeProduto).find('[data-testid="adicionarNaLista"]').click();
  }
}

export default new HomePage();
