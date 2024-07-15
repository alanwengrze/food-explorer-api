const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');

const authConfig = require('../configs/auth');
const { sign } = require('jsonwebtoken')

const UsersRepository = require('../repositories/UsersRepository');
class SessionsController{

  async create(request, response){
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    response.status(201).json({ user, token });
  }
}

module.exports = SessionsController;