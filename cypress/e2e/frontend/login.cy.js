import LoginPage from '../../pages/LoginPage';

describe('Frontend - Login', () => {
  it('deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
    LoginPage.visitar();
    LoginPage.login('usuario_invalido@teste.com', 'senhaErrada');

    cy.contains('Email e/ou senha inválidos').should('be.visible');
    LoginPage.elementos.email().should('be.visible');
  });
});
