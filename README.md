# Squadra QA Cypress Challenge

Desafio técnico de QA: automação de testes E2E (frontend) e de API utilizando **Cypress** + **JavaScript**, sobre a aplicação [ServeRest](https://serverest.dev/).

## Aplicação sob teste

- Frontend: https://front.serverest.dev/
- API (Swagger): https://serverest.dev/

## Stack

- [Cypress](https://www.cypress.io/)
- JavaScript
- Padrão Page Object Model (POM) para os testes de frontend

## Estrutura do projeto

cypress/
├── e2e/
│   ├── frontend/   # cenários E2E (UI)
│   └── api/        # cenários de API
├── pages/          # Page Objects (POM)
├── fixtures/        # massa de dados de teste
└── support/         # comandos customizados e configuração global



## Como rodar

```bash
npm install
npm run cy:open      # modo interativo
npm run cy:run       # modo headless (todos os testes)
npm run cy:run:e2e   # apenas testes de frontend
npm run cy:run:api   # apenas testes de API
Status
🚧 Em desenvolvimento — cenários de teste sendo adicionados.
