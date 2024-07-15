const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const bcrypt = require('bcryptjs');
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const emailExists = await knex("users").where({ email }).first();

    if(emailExists) {
      throw new AppError("Esse e-mail já está em uso.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 8);


    const user = await knex("users").insert({
      name,
      email,
      password: hashedPassword
    }).returning("*");
    
    
    response.status(201).json(user);
  }
}

module.exports = UsersController;