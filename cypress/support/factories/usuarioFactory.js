import { faker } from '@faker-js/faker';

export function criarUsuario(overrides = {}) {
  return {
    nome: faker.person.fullName(),
    email: `qa_${Date.now()}_${faker.string.alphanumeric(5)}@teste.com`,
    password: faker.internet.password(),
    administrador: 'false',
    ...overrides,
  };
}
