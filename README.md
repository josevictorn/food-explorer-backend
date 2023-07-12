
# Food Explorer

Esse projeto é uma API Restful de uma aplicação completa - tanto back-end, quanto front-end - de cardápio digital para um restaurante fictício, conhecido como Food Explorer.

O Food Explorer terá duas personas: o admin e o usuário.

O admin é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal.

O usuário irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.


## Funcionalidades

- autenticação de usuário com JWT;
- usuário e admin podem fazer uma busca tanto pelo nome do prato quanto pelos ingredientes;
- o admin poderá casdastar um novo prato, que deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço;
- usuário e admin irá visualizar todos os pratos cadastrados;
- o admin poderá atuallizar informações sobre um prato cadastrado.


## Tecnologias utilizadas

- Express;
- Cors;
- Json Web Token (JWT);
- BycriptJS;
- Multer;
- Knex;
- SQLite;
- PM2;


## Documentação da API

#### Cadastra um novo usuário no sistema a partir de um nome, email e senha

```http
  GET /users/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Autentica um usuário a partir do email e senha e retorna um token  

```http
  GET /sessions/
```

#### Retorna um conjunto de pratos buscados tanto pelo nome do prato quanto pelos ingredientes

```http
  GET /dishes/
```

#### Retornar um prato

```http
  GET /dishes/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você deseja buscar |

#### Cadastra um novo prato ao sistema

```http
  POST /dishes/
```

#### Atualiza um prato, adicionando uma imagem

```http
  PATCH /dishes/${id}/upload
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você deseja adicionar a imagem |

#### Atualiza um prato

```http
  PUT /dishes/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você deseja atualizar |

#### Deleta um prato

```http
  DELETE /dishes/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você deseja deletar |

## Acesso

Link de acesso ao projeto: https://foodexplo.netlify.app/

## Execução do projeto

```bash
# clone o projeto e acesse a pasta
$ git clone https://github.com/josevictorn/food-explorer-backend.git
$ cd server

# instale as dependências
$ npm install

# crie o banco de dados
$ npm run dev
$ npm migrate dev

# execute o projeto
$ npm run dev
```

## Autor

Feito com amor por [@josevictorn](https://github.com/josevictorn)

