const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');

const UsersRepository = require('../repositories/UsersRepository');
const UsersCreateService = require('../services/UsersCreateService');
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const usersCreateService = new UsersCreateService(usersRepository);

    const user = await usersCreateService.execute({ name, email, password });
    
    response.status(201).json(user);
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);
    console.log(user.id)

    const userWithUpdatedEmail = await usersRepository.findByEmail(email);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Esse e-mail já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError('Voce precisa informar a senha antiga para definir a nova senha.');
    }

    if(password && old_password) {

      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('A senha antiga esta incorreta. Tente novamente.');
      }
      user.password = await hash(password, 8);
    }

    await knex('users').update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    }).where({ id: user.id });

    response.json(user);
    
  }
}

module.exports = UsersController;