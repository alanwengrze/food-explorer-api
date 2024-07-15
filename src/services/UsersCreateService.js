const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
class UsersCreateService{
  constructor(userRepository){
    this.userRepository = userRepository;
  }
  async execute({name, email, password}){

    const emailExists = await this.userRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError("Esse e-mail já está em uso.", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({name, email, password: hashedPassword});
    
    return user;

  }
}

module.exports = UsersCreateService;