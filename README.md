# Squadra QA Cypress Challenge

[![Cypress Tests](https://github.com/Silviio/squadra-ambevtech-qa-challenge/actions/workflows/cypress.yml/badge.svg)](https://github.com/Silviio/squadra-ambevtech-qa-challenge/actions/workflows/cypress.yml)

Desafio técnico de QA: automação de testes E2E (frontend) e de API utilizando **Cypress** + **JavaScript**, sobre a aplicação [ServeRest](https://serverest.dev/).

## Aplicação sob teste

- Frontend: https://front.serverest.dev/
- API (Swagger): https://serverest.dev/

## Stack

- [Cypress](https://www.cypress.io/)
- JavaScript
- [@faker-js/faker](https://fakerjs.dev/) para massa de dados dinâmica e realista
- Padrão Page Object Model (POM) para os testes de frontend
- Camada de *services* (`UsuariosApi`, `LoginApi`, `ProdutosApi`) para os testes de API
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) para relatório HTML dos testes
- [ESLint](https://eslint.org/) (`eslint-plugin-cypress`) para padronização e lint do código

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── frontend/    # cenários E2E (UI)
│   └── api/         # cenários de API
├── pages/           # Page Objects (POM)
├── fixtures/        # massa de dados de teste (ex: imagem de upload)
└── support/
    ├── commands.js  # comandos customizados (cy.login, reaproveitado como pré-condição)
    ├── services/    # camada de chamadas à API (UsuariosApi, LoginApi, ProdutosApi)
    └── factories/   # geração de dados de teste com faker
```

## Cenários cobertos

### API

- Login: cadastra um usuário e realiza login com sucesso, validando o token retornado.
- Usuários: valida a regra de negócio de e-mail duplicado (400).
- Produtos: cadastra um produto como administrador e confirma via filtro por nome.
- Produtos (controle de acesso): não permite cadastro sem token (401) nem por usuário sem privilégio de administrador (403).

### Frontend

- **Cadastro de usuário** (`cadastro.cy.js`) — preenche o formulário de cadastro e confirma o redirecionamento para a Home.
- **Login inválido** (`login.cy.js`) — tenta logar com credenciais erradas e confirma a mensagem de erro exibida.
- **Carrinho** (`carrinho.cy.js`) — login + busca de produto + adicionar à lista de compras.
- **Produtos (admin)** (`cadastroProduto.cy.js`) — cadastra um produto pela UI e confirma na listagem; e exclui um produto existente, confirmando que ele some da lista.

O login com sucesso não é um cenário próprio — vira só uma pré-condição (comando `cy.login`) usada pelos cenários que precisam de sessão autenticada (Carrinho e Produtos admin). Já o login inválido continua como cenário independente, porque testa o comportamento do próprio formulário de login, não é setup de outra coisa.

## Como rodar

```bash
npm install
npm run cy:open      # modo interativo
npm run cy:run       # modo headless (todos os testes)
npm run cy:run:e2e   # apenas testes de frontend
npm run cy:run:api   # apenas testes de API
npm run lint         # valida o código com ESLint
```

Após `cy:run`, o relatório HTML fica em `cypress/reports/html/index.html`.

## CI/CD

O workflow [`cypress.yml`](.github/workflows/cypress.yml) roda a cada push/PR na `main`:

- **Lint** — valida o código com ESLint.
- **API tests** — roda os specs de API.
- **Frontend tests** — roda os specs de frontend em uma matriz **Chrome + Firefox**.

Usa a [Cypress GitHub Action](https://github.com/cypress-io/github-action) e a versão do Node do [`.nvmrc`](.nvmrc). Cada job publica o relatório Mochawesome como artefato; o job de frontend também publica screenshots (em falha) e vídeos.

## Observações

- O ambiente é o servidor público do ServeRest (dados compartilhados e reais), por isso os testes geram usuários/produtos com dados únicos a cada execução, evitando colisão com massa de outras pessoas.
- O botão **"Editar"** na tela de listagem de produtos do painel admin não está funcional no ambiente atual (não dispara nenhuma ação). Por isso esse fluxo não foi automatizado — é uma limitação da aplicação sob teste, não do código de automação.
- A tela **"Carrinho"** (`/carrinho`) está "em construção" no ambiente atual. Por isso o cenário de carrinho vai só até adicionar o produto na "Lista de Compras" (o que a aplicação realmente suporta), sem validar a compra em si.

## Status

✅ Cenários de API e frontend implementados e validados localmente.
