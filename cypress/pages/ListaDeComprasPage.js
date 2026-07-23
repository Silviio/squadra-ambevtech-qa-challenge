class ListaDeComprasPage {
  produtoEstaNaLista(nomeProduto) {
    return cy.contains('[data-testid="shopping-cart-product-name"]', nomeProduto);
  }
}

export default new ListaDeComprasPage();
