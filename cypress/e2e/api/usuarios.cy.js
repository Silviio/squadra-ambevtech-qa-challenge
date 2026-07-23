import UsuariosApi from '../../support/services/UsuariosApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';

describe('API - Usuários', () => {
  it('não deve permitir o cadastro de usuário com e-mail já utilizado', () => {
    const usuario = criarUsuario();

    UsuariosApi.cadastrar(usuario).then((primeiroCadastro) => {
      expect(primeiroCadastro.status).to.eq(201);

      UsuariosApi.cadastrar(usuario).then((segundoCadastro) => {
        expect(segundoCadastro.status).to.eq(400);
        expect(segundoCadastro.body.message).to.eq('Este email já está sendo usado');
      });
    });
  });
});
