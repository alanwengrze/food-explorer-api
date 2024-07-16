const authConfig = require('../configs/auth');
const { sign } = require('jsonwebtoken')

const UsersRepository = require('../repositories/UsersRepository');
const SessionsCreateService = require('../services/SessionsCreateService');
class SessionsController{

  async create(request, response){
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const sessionsCreateService = new SessionsCreateService(usersRepository);

    const user = await sessionsCreateService.execute({ email, password });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role}, secret, {
      subject: String(user.id),
      expiresIn
    });

    response.status(201).json({ user, token });
  }
}

module.exports = SessionsController;