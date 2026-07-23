import LoginApi from '../../support/services/LoginApi';
import UsuariosApi from '../../support/services/UsuariosApi';
import ProdutosApi from '../../support/services/ProdutosApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';
import { criarProduto } from '../../support/factories/produtoFactory';

describe('API - Produtos', () => {
  it('deve cadastrar um produto como administrador e encontrá-lo ao filtrar por nome', () => {
    const administrador = criarUsuario({ administrador: 'true' });
    const produto = criarProduto();

    UsuariosApi.cadastrar(administrador)
      .then(() => LoginApi.login({ email: administrador.email, password: administrador.password }))
      .then((respostaLogin) => ProdutosApi.cadastrar(produto, respostaLogin.body.authorization))
      .then((respostaCadastro) => {
        expect(respostaCadastro.status).to.eq(201);

        ProdutosApi.listar({ nome: produto.nome }).then((respostaListagem) => {
          expect(respostaListagem.status).to.eq(200);
          expect(respostaListagem.body.produtos).to.have.length(1);
          expect(respostaListagem.body.produtos[0]).to.include({
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade,
          });
        });
      });
  });
});
