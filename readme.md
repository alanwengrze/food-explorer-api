<h1 align="center"> foodexplorer - backend</h1>

Foodexplorer é o projeto de conclusão da trilha explorer da [Rocketseat](https://www.rocketseat.com.br/). Uma simulação de um restaurante, onde, quando autenticados, os usuários com contas de admin, podem adicionar pratos, editar, excluir e visualizar cada prato individualmente.

## Tópicos
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instruções-de-instalação)
  - [Como utilizar](#como-utilizar)
  - [Rotas](#rotas-da-aplicação)
  - [frontend](#frontend-da-aplicação)
  - [Tecnologias utilizadas](#tecnologias-utilizadas)
  - [Deploy](#deploy)
  - [Licença](#licença)
## Pré-requisitos
Você precisa ter [Node.js](https://nodejs.org) instalado na sua máquina para rodar esta aplicação.

## Instruções de instalação

1. **Clonando o projeto**
```bash
git clone https://github.com/alanwengrze/food-explorer-api.git
```
2. **Navegando até o projeto**

```bash
cd food-explorer-api
```
3. **Instalando as dependências**
```bash
npm install
ou
npm i
```
4. **Rodando a aplicação na máquina local**
```bash
npm run dev
```
## Como utilizar
**Conta demonstrativa**
```bash
  e-mail: admin@gmail.com
  senha: 123
```
Com a conta admin, o usuário consegue fazer o CRUD dos pratos.

## Rotas da aplicação
[Rotas](./.github/routes.md)

## Frontend da aplicação
Para ter uma experiência completa, é necessário utilizar o frontend da aplicação. Você pode acessar o [**frontend clicando aqui**](https://github.com/alanwengrze/food-explorer-frontend).

## Tecnologias utilizadas
- [**sqlite**](https://www.sqlite.org/index.html)
- [**bcryptjs**](https://www.npmjs.com/package/bcrypt/)
- [**cors**](https://www.npmjs.com/package/cors)
- [**express**](https://www.npmjs.com/package/express)
- [**express-async-errors**](https://www.npmjs.com/package/express-async-errors)
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)
- [**knex**](https://www.npmjs.com/package/knex)
- [**pm2**](https://www.npmjs.com/package/pm2)
- [**multer**](https://www.npmjs.com/package/multer)

## Deploy
[Render](https://render.com/).

Acesse ao deploy do [food-explorer](https://alnfoodexplorer.netlify.app/)

## Licença

O app **Food Explorer** é distribuída sob a licença MIT. Isso significa que você pode usar, modificar e distribuir o código desta API livremente, desde que inclua a declaração de direitos autorais e a licença MIT em qualquer cópia ou parte dela.