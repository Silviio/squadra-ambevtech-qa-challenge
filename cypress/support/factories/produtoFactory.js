import { faker } from '@faker-js/faker';

export function criarProduto(overrides = {}) {
  return {
    nome: `${faker.commerce.productName()} ${Date.now()}`,
    preco: faker.number.int({ min: 10, max: 5000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    ...overrides,
  };
}
