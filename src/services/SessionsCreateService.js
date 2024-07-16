const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
class SessionsCreateService {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }) {

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    return user;
  }
}

module.exports = SessionsCreateService;