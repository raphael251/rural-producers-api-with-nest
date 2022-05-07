# API - Rural Producers

## Tabela de Conteúdo

- [Objetivo Geral](#objetivo-geral)
- [Requisitos de Negócio](#requisitos-de-negócio)
- [Requisitos técnicos](#requisitos-técnicos)
- [Exemplo de requisição de cadastro](#exemplo-de-requisição-de-cadastro)
- [Rodando o projeto](#rodando-o-projeto)

## Objetivo Geral

Essa API tem como objetivo fornecer um cadastro de produtor rural com os seguintes dados:

1.  CPF ou CNPJ
2.  Nome do produtor
3.  Nome da Fazenda
4.  Cidade
5.  Estado
6.  Área total em hectares da fazenda
7.  Área agricultável em hectares
8.  Área de vegetação em hectares
9.  Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

## Requisitos de negócio

- O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
- O sistema deverá validar CPF e CNPJ digitados incorretamente.
- A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- Cada produtor pode plantar mais de uma cultura em sua Fazenda.
- Deve existir um endpoint que retorna:
  - Total de fazendas em quantidade
  - Total de fazendas em hectares (área total)
  - Total de fazendas por estado.
  - Total de fazendas por cultura.
  - Total de fazendas por uso de solo (Área agricultável e vegetação)

## Requisitos técnicos

- O back-end deve salvar os dados em um banco de dados Postgres usando o NodeJS como layer de Backend, e entregar os endpoints para cadastrar, editar, e excluir produtores rurais, além do endpoint que retorne os totais para o dashboard.

## Rodando o projeto

Antes de rodar o projeto, é necessário rodar o comando `docker-compose up -d` para subir o banco de dados (você vai precisar do Docker e Docker Compose instalados).

Após a subida do banco, duplique o arquivo `.env.example` e renomeie para `.env`

Então rode o comando `npm run start` e já pode começar a fazer requisições para a API

## Rotas da API

- producers
  - POST /producers
  - GET /producers[?name=<nome-do-produtor>]
  - GET /producers/:id
  - PATCH /producers/:id
  - DELETE /producers/:id
- dashboard
  - GET /dashboard

## Exemplo de requisição de cadastro

```jsonc
{
  {
    "name": "Bruce Lee",
    "document": {
        "type": "cpf", // ou "cnpj"
        "cpf": "44433322211"
        // "cnpj": "44333222000155"
    },
    "farmName": "Fazenda Feliz",
    "city": "São Paulo",
    "stateInitials": "SP",
    "totalArea": 50.08,
    "arableArea": 25.02,
    "vegetationArea": 24.20,
    "cropsPlanted": [
        "Soja",
        "Milho",
        "Algodão",
        "Café",
        "Cana de Açúcar"
    ]
}
}
```
