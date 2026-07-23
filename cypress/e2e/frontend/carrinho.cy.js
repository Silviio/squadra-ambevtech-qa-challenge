import HomePage from '../../pages/HomePage';
import UsuariosApi from '../../support/services/UsuariosApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';

describe('Frontend - Lista de compras', () => {
  it('deve pesquisar um produto e adicioná-lo à lista de compras', () => {
    const usuario = criarUsuario();
    const nomeProduto = 'Logitech MX Vertical';

    UsuariosApi.cadastrar(usuario).then((respostaCadastro) => {
      expect(respostaCadastro.status).to.eq(201);

      cy.login(usuario.email, usuario.password);

      HomePage.pesquisarProduto(nomeProduto);
      cy.contains(nomeProduto).should('be.visible');

      HomePage.adicionarProdutoNaLista(nomeProduto);
      HomePage.elementos.contadorCarrinho().should('contain.text', '1');
    });
  });
});
