## Principais Rotas

### users
  create
  localhost:3000/users
  *Input*
```json
  {
    "name":"user",
    "email":"user@user.com",
    "password":"@User123"
  }
```

*Output*
```json
  {
    "id": 16,
    "name": "user",
    "email": "user@user.com",
    "password": "$2a$08$a082IWLZsIBsOy1q.iSFteVtmTJMBre3Jb5qc6a6OxQ6wd//IBdg.",
    "role": "user",
    "created_at": "2024-08-01 01:03:51",
    "updated_at": "2024-08-01 01:03:51"
  }
```

*Para testar as próximas rotas, é necessário configurar o token de autenticação e configurar a role do usuário como admin!*

### dishes
  **create**
  localhost:3000/dishes
  ```json
  {
    "name": "Açaí",
    "description": "Açaí com frutas adicionais",
    "image": "https://image.png",
    "price": 18.50,
    "category": "dessert",
    "ingredients":["açaí", "banana", "leite em pó"]
  }
  ```
  **update**
  **Necessário id do prato**
  ex: localhost:3000/dishes/id
  *Input*
  ```json
  {
    "name": "Suco de maracujá",
    "description": "Suco de maracujá gelado, cremoso, docinho.",
    "image": "891423c355b64c09cf3f-maracuja.png",
    "price": 13.97,
    "category": "drink",
    "ingredients":["açúcar", "maracujá", "água"]
  }
  ```
  *Output*
  ```json
  {
    "name": "Suco de maracujá",
    "description": "Suco de maracujá gelado, cremoso, docinho.",
    "price": 13.97,
    "category": "drink",
    "ingredients": [
      "açúcar",
      "maracujá",
      "água"
    ]
  }
  ```

  **Index**

  localhost:3000/dishes
  Retorna todos os pratos.

  Nessa rota podemos filtrar os pratos por nome do prato ou por ingredientes. Passamos o argumento na Query e ele retorna os pratos.
  Por ex:
  localhost:3000/dishes?ingredients=cebola

  **Output**
  ```json
  [
    {
      "id": 53,
      "name": "Salada Molla",
      "description": "Saladinha gostosa",
      "price": 79.97,
      "category": "meal",
      "image": "bfc3fd5b69f882bd3208-salada.png",
      "ingredients": [
        "tomate",
        "alface",
        "cebola"
      ]
    },
    {
      "id": 45,
      "name": "Salada Ravanello",
      "description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      "price": 49.97,
      "category": "meal",
      "image": "7841d7c70dcc7f697956-ravanello.png",
      "ingredients": [
        "cebola",
        "tomate",
        "alface"
      ]
    }
  ]
  ```
  **Show**
  **Necessário id do prato**
  ex: localhost:3000/dishes/id
  Retorna o prato com o id especificado.

  *Output*
  ```json
  {
    "id": 44,
    "name": "Suco de maracujá",
    "description": "Suco de maracujá gelado, cremoso, docinho.",
    "image": "891423c355b64c09cf3f-maracuja.png",
    "price": 13.97,
    "category": "drink",
    "created_at": "2024-07-22 22:44:49",
    "updated_at": "2024-07-22 22:44:49",
    "ingredients": [
      {
        "id": 279,
        "name": "açúcar",
        "dishes_id": 44
      },
      {
        "id": 280,
        "name": "maracujá",
        "dishes_id": 44
      },
      {
        "id": 281,
        "name": "água",
        "dishes_id": 44
      }
    ]
  }
  ```
  **Delete**
  localhost:3000/dishes/id