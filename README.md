# API - Rural Producers

## Tabela de Conteúdo

- [Objetivo Geral](#objetivo-geral)
- [Requisitos de Negócio](#requisitos-de-negócio)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Rodando o projeto](#rodando-o-projeto)
- [Documentação da API (Swagger)](#documentação-da-api-swagger)
- [Rotas da API](#rotas-da-api)
- [Exemplo de payload da requisição de cadastro](#exemplo-de-payload-da-requisição-de-cadastro)

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

## Tecnologias Utilizadas

Para a construção dessa aplicação utilizei o framework [NestJS](https://docs.nestjs.com/) que ajuda na construção de aplicações server-side como essa API. Usei muitos recursos interessantes que o framework tem a oferecer, onde caso fosse criar tudo "na unha", levaria muito mais tempo e é algo que sempre se repete em novos projetos.

Citando as features do framework que foram usadas, temos a utilização dos decorators que auxiliam na definição de módulos, controllers e rotas. Também existe integração entre outras libs muito bem feitas do Node que tem compatibilidade com o Typescript, como a **class-validator** para validações de dados de entrada nos endpoints ou em outros pontos do código se for necessário ou a **TypeORM** que faz o mapeamento do dados relacionais do banco de dados para objetos Javascript.

O banco de dados utilizado foi o PostgreSQL, que foi configurado para ser executado através do Docker Compose em um container.

## Rodando o projeto

Antes de rodar o projeto, é necessário rodar o comando `docker-compose up -d` para subir o banco de dados (você vai precisar do Docker e Docker Compose instalados).

Após a subida do banco, duplique o arquivo `.env.example` e renomeie para `.env`

Então rode o comando `npm run start` e já pode começar a fazer requisições para a API

## Documentação da API (Swagger)

Também foi criada uma versão inicial da documentação da API com o Swagger que poderá ser acessada na rota `/producers/dashboard`.

## Rotas da API

- producers
  - POST /producers
  - GET /producers[?name=nome-do-produtor]
  - GET /producers/:id
  - PATCH /producers/:id
  - DELETE /producers/:id
  - GET /producers/dashboard

## Exemplo de payload da requisição de cadastro de um produtor

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
