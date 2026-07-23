import LoginPage from '../../pages/LoginPage';
import CadastroPage from '../../pages/CadastroPage';
import { criarUsuario } from '../../support/factories/usuarioFactory';

describe('Frontend - Cadastro de usuário', () => {
  it('deve cadastrar um novo usuário com sucesso e redirecionar para a Home', () => {
    const usuario = criarUsuario();

    LoginPage.visitar();
    LoginPage.irParaCadastro();
    CadastroPage.cadastrar(usuario);

    cy.contains('Cadastro realizado com sucesso').should('be.visible');
    cy.get('[data-testid="logout"]').should('be.visible');
  });
});
