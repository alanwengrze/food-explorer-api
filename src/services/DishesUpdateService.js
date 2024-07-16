const AppError = require('../utils/AppError');

class DishesUpdateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ id, name, description, price, category, ingredients }) {
    const dish = await this.dishesRepository.findById(id);

    if(!dish) {
      throw new AppError('Prato inexistente.', 404);
    }

    if(!name || !description || !price || !category || !ingredients) {
      throw new AppError('Todos os campos devem ser preenchidos.', 400);
    }
    if(name === "" || description === "" || price === "" || category === "" || ingredients === "") {
      throw new AppError('Todos os campos devem ser preenchidos.', 400);
    }

    if(name.length < 3) {
      throw new AppError('O nome deve conter pelo menos 3 letras.', 400);
    }

    if(price <= 0) {
      throw new AppError('O preço deve ser maior que 0.', 400);
    }

    const dishUpdated = await this.dishesRepository.update({ id, name, description, price, category, ingredients });

    return dishUpdated;
  }
}

module.exports = DishesUpdateService;