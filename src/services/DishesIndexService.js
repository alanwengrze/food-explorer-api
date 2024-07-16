const AppError = require('../utils/AppError');
class DishesIndexService {

  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ name, category, ingredients }) {
    const dishes = await this.dishesRepository.index({ name, category, ingredients });
    return dishes;
  }
}

module.exports = DishesIndexService;