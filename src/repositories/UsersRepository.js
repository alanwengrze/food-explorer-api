const knex = require('../database/knex');

class UsersRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email }).first();
    return user;
  }

  async findById(id) {
    const user = await knex('users').where({ id }).first();
    return user;
  }
  async create({ name, email, password }) {
    const user = await knex('users').insert({
      name,
      email,
      password
    }).returning('*');
    return user;
  }

}

module.exports = UsersRepository;