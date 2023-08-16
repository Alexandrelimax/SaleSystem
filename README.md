# SaleSystem
# API de Gerenciamento de Pedidos

A API ainda está em desenvolvimento e precisa passar por demais testes.

Uma API para gerenciamento de pedidos, permitindo criar, visualizar e gerenciar pedidos de produtos.

## Tabela de Conteúdos

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Uso](#uso)
- [Rotas](#rotas)
- [Demais Rotas](#demais-rotas)
- [Contato](#contato)
- [Diagrama ER](#diagrama-er)

## Visão Geral

A API de Gerenciamento de Pedidos oferece funcionalidades para criar produtos, associá-los aos seus fornecedores, fazer pedidos de produtos, associar clientes, endereços, telefones, detalhes de pagamento aos pedidos, e fornecer informações sobre pedidos existentes.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- MySQL

## Uso

A API oferece endpoints para gerenciar pedidos, clientes, endereços, fornecedores, produtos e detalhes de pagamento. 

## Rotas

A API oferece as seguintes rotas principais:

1. Criar um usuário com a rota `POST /register`.
2. Criar um produto com a rota `POST /products`.
3. Criar um pedido com a rota `POST /client/:client_id/product/:product_id/pedido`.

## Demais Rotas
- `GET /order/:id`: Retorna detalhes de um pedido.
- `GET /profile/:id/telefone`: Retorna o telefone de um cliente.
- `PATCH /profile/:id/telefone/:telefone_id`: Edita o telefone de um cliente.
- `PUT /fornecedor/:id`: Edita dados de um fornecedor 

 em cada arquivo de rota, a API fornece todas os verbos http que sejam relevantes à API.

## Contato

Para mais informações, entre em contato pelo email: alexandrelimaxxxx@gmail.com

## Diagrama ER
![diagramaER](https://github.com/Alexandrelimax/SaleSystem/assets/96657257/8ee9c968-fad3-4033-889f-710ab7efce64)



