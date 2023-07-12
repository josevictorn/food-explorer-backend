const { hash } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const {name, email, password} = request.body;

    const checkIfUserExist = await knex("users").where({ email }).first();

    if(checkIfUserExist) {
      throw new AppError("Este e-mail já está em uso.")
    }

    if(!email.includes("@") || !email.includes(".")) {
      throw new AppError("Digite um e-mail válido.")
    }

    if(password.length < 6) {
      throw new AppError("A senha deve possuir pelo menos 6 dígitos.")
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json();
  }
}

module.exports = UsersController;