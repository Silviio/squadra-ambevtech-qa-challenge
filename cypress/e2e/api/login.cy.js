import LoginApi from '../../support/services/LoginApi';
import UsuariosApi from '../../support/services/UsuariosApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';

describe('API - Login', () => {
  it('deve realizar login com sucesso e retornar um token válido', () => {
    const usuario = criarUsuario();

    UsuariosApi.cadastrar(usuario).then((respostaCadastro) => {
      expect(respostaCadastro.status).to.eq(201);

      LoginApi.login({ email: usuario.email, password: usuario.password }).then((respostaLogin) => {
        expect(respostaLogin.status).to.eq(200);
        expect(respostaLogin.body.message).to.eq('Login realizado com sucesso');
        expect(respostaLogin.body.authorization).to.match(/^Bearer\s.+/);
      });
    });
  });
});
