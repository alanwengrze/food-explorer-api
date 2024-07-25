const AppError = require('../utils/AppError');
class DishesCreateService {

  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ name, description, price, category, ingredients, image }) {
   
    if(!name || !description || !price || !category || !ingredients) {
      throw new AppError('Todos os campos devem ser preenchidos.', 400);
    }
    if(ingredients.length < 1) {
      throw new AppError('O prato deve ter pelo menos 1 ingrediente.', 400);
    }

    if(price < 2 || price > 500) {
      throw new AppError('O preço deve ser maior que R$2,00 e menor que R$500,00.', 400);
    }

    const dish = await this.dishesRepository.create({ name, description, price, category, ingredients, image });
    return dish;
  }
}

module.exports = DishesCreateService;