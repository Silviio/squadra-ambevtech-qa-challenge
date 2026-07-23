class ListaProdutosPage {
  linhaDoProduto(nomeProduto) {
    return cy.contains('td', nomeProduto).parents('tr');
  }

  excluirProduto(nomeProduto) {
    this.linhaDoProduto(nomeProduto).contains('button', 'Excluir').click();
  }
}

export default new ListaProdutosPage();
