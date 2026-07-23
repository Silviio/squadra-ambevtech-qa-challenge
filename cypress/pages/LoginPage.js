class LoginPage {
  elementos = {
    email: () => cy.get('[data-testid="email"]'),
    senha: () => cy.get('[data-testid="senha"]'),
    botaoEntrar: () => cy.get('[data-testid="entrar"]'),
    linkCadastrar: () => cy.get('[data-testid="cadastrar"]'),
  };

  visitar() {
    cy.visit('/');
  }

  login(email, senha) {
    this.elementos.email().type(email);
    this.elementos.senha().type(senha);
    this.elementos.botaoEntrar().click();
  }

  irParaCadastro() {
    this.elementos.linkCadastrar().click();
  }
}

export default new LoginPage();
