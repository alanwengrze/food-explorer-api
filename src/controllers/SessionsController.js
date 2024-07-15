const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
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
    
    response.json({ email, password });
  }
}

module.exports = SessionsController;