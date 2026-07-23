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

  it('não deve permitir cadastro de produto sem token de autenticação', () => {
    const produto = criarProduto();

    ProdutosApi.cadastrar(produto, '').then((resposta) => {
      expect(resposta.status).to.eq(401);
      expect(resposta.body.message).to.eq(
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
      );
    });
  });

  it('não deve permitir cadastro de produto por usuário sem privilégio de administrador', () => {
    const usuarioComum = criarUsuario({ administrador: 'false' });
    const produto = criarProduto();

    UsuariosApi.cadastrar(usuarioComum)
      .then(() => LoginApi.login({ email: usuarioComum.email, password: usuarioComum.password }))
      .then((respostaLogin) => ProdutosApi.cadastrar(produto, respostaLogin.body.authorization))
      .then((resposta) => {
        expect(resposta.status).to.eq(403);
        expect(resposta.body.message).to.eq('Rota exclusiva para administradores');
      });
  });
});
