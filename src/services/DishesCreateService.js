const AppError = require('../utils/AppError');
class DishesCreateService {

  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ name, description, price, category, ingredients }) {

    if(!name || !description || !price || !category || !ingredients) {
      throw new AppError('Todos os campos devem ser preenchidos.', 400);
    }


    const dish = await this.dishesRepository.create({ name, description, price, category, ingredients });
    return dish;
  }
}

module.exports = DishesCreateService;