const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');
class DishesCreateService {

  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ name, description, price, category, ingredients, image }) {

    const dishExists = await this.dishesRepository.findByName(name);

    if(dishExists) {
      throw new AppError('Esse prato já existe.', 400);
    }
   
    if(!name || !description || !price || !category || !ingredients) {
      throw new AppError('Todos os campos devem ser preenchidos.', 400);
    }
    if(ingredients.length < 1) {
      throw new AppError('O prato deve ter pelo menos 1 ingrediente.', 400);
    }

    if(price < 2 || price > 500) {
      throw new AppError('O preço deve ser maior que R$2,00 e menor que R$500,00.', 400);
    }
    const diskStorage = new DiskStorage();
   
    const filename = await diskStorage.saveFile(image);

    const dish = await this.dishesRepository.create({ name, description, price, category, ingredients, image: filename });
    return dish;
  }
}

module.exports = DishesCreateService;