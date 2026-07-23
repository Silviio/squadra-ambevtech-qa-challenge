class CadastroPage {
  elementos = {
    nome: () => cy.get('[data-testid="nome"]'),
    email: () => cy.get('[data-testid="email"]'),
    senha: () => cy.get('[data-testid="password"]'),
    checkboxAdministrador: () => cy.get('[data-testid="checkbox"]'),
    botaoCadastrar: () => cy.get('[data-testid="cadastrar"]'),
  };

  cadastrar(usuario) {
    this.elementos.nome().type(usuario.nome);
    this.elementos.email().type(usuario.email);
    this.elementos.senha().type(usuario.password);
    if (usuario.administrador === 'true') {
      this.elementos.checkboxAdministrador().check();
    }
    this.elementos.botaoCadastrar().click();
  }
}

export default new CadastroPage();
