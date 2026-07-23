import AdminHomePage from '../../pages/AdminHomePage';
import CadastroProdutoPage from '../../pages/CadastroProdutoPage';
import ListaProdutosPage from '../../pages/ListaProdutosPage';
import UsuariosApi from '../../support/services/UsuariosApi';
import LoginApi from '../../support/services/LoginApi';
import ProdutosApi from '../../support/services/ProdutosApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';
import { criarProduto } from '../../support/factories/produtoFactory';

describe('Frontend - Produtos (admin)', () => {
  let administrador;

  beforeEach(() => {
    administrador = criarUsuario({ administrador: 'true' });

    UsuariosApi.cadastrar(administrador).then((respostaCadastro) => {
      expect(respostaCadastro.status).to.eq(201);
      cy.login(administrador.email, administrador.password);
    });
  });

  it('deve cadastrar um produto pela UI e encontrá-lo na listagem', () => {
    const produto = criarProduto();

    AdminHomePage.irParaCadastroDeProdutos();
    CadastroProdutoPage.cadastrar(produto);

    AdminHomePage.irParaListaDeProdutos();
    ListaProdutosPage.linhaDoProduto(produto.nome).within(() => {
      cy.contains('td', String(produto.preco)).should('exist');
      cy.contains('td', String(produto.quantidade)).should('exist');
    });
  });

  it('deve excluir um produto existente e ele não deve mais aparecer na listagem', () => {
    const produto = criarProduto();

    LoginApi.login({ email: administrador.email, password: administrador.password }).then((respostaLogin) => {
      ProdutosApi.cadastrar(produto, respostaLogin.body.authorization).then((respostaCadastro) => {
        expect(respostaCadastro.status).to.eq(201);

        AdminHomePage.irParaListaDeProdutos();
        ListaProdutosPage.linhaDoProduto(produto.nome).should('exist');

        ListaProdutosPage.excluirProduto(produto.nome);

        cy.contains('td', produto.nome).should('not.exist');
      });
    });
  });
});
