const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
class UsersCreateService{
  constructor(userRepository){
    this.userRepository = userRepository;
  }
  async execute({name, email, password}){

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

    if(!name || !email || !password) {
      throw new AppError("Todos os campos devem ser preenchidos.", 400);
    }

    const emailExists = await this.userRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError("Esse e-mail já está em uso.", 400);
    }

    if(!emailRegex.test(email)) {
      throw new AppError("O e-mail informado é inválido.", 400);
    }

    if(!passwordRegex.test(password)) {
      throw new AppError("A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um caractere especial e um número.", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({name, email, password: hashedPassword});
    
    return user;
  }
}

module.exports = UsersCreateService;