const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');
class UsersUpdateService {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password, old_password, id }) {
    const user = await this.usersRepository.findById(id);

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Esse e-mail já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError('Voce precisa informar a senha antiga para definir a nova senha.');
    }

    if(password === old_password){
      throw new AppError('A nova senha deve ser diferente da antiga.');
    }

    if(password && old_password) {

      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('A senha antiga esta incorreta. Tente novamente.');
      }
      user.password = await hash(password, 8);
    }

    const updatedUser = await this.usersRepository.update(user);
    
    return updatedUser;
  }
}

module.exports = UsersUpdateService;