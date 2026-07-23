class CadastroProdutoPage {
  elementos = {
    nome: () => cy.get('[data-testid="nome"]'),
    preco: () => cy.get('[data-testid="preco"]'),
    descricao: () => cy.get('[data-testid="descricao"]'),
    quantidade: () => cy.get('[data-testid="quantity"]'),
    imagem: () => cy.get('[data-testid="imagem"]'),
    botaoCadastrar: () => cy.get('[data-testid="cadastarProdutos"]'),
  };

  cadastrar(produto) {
    this.elementos.nome().type(produto.nome);
    this.elementos.preco().type(String(produto.preco));
    this.elementos.descricao().type(produto.descricao);
    this.elementos.quantidade().type(String(produto.quantidade));
    this.elementos.imagem().selectFile('cypress/fixtures/product-test.png');
    this.elementos.botaoCadastrar().click();
  }
}

export default new CadastroProdutoPage();
