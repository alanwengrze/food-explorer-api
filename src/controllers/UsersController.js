
const UsersRepository = require('../repositories/UsersRepository');
const UsersCreateService = require('../services/UsersCreateService');
const UsersUpdateService = require('../services/UsersUpdateService');
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const usersCreateService = new UsersCreateService(usersRepository);

    const user = await usersCreateService.execute({ name, email, password });
    
    return response.status(201).json(user);
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const usersRepository = new UsersRepository();
    const usersUpdateService = new UsersUpdateService(usersRepository);
    
    const user = await usersUpdateService.execute({ name, email, password, old_password, id: user_id });

    return response.json(user);
  }
}

module.exports = UsersController;