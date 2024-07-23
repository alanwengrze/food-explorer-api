const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const DiskStorage = require('../providers/DiskStorage');

const DishesRepository = require('../repositories/DishesRepository');
const DishesCreateService = require('../services/DishesCreateService');
const DishesIndexService = require('../services/DishesIndexService');
const DishesUpdateService = require('../services/DishesUpdateService');
class DishesController {

  async create(request, response) {
    const {name, description, price, category, ingredients} = request.body;

    const dishesRepository = new DishesRepository();
    const dishesCreateService = new DishesCreateService(dishesRepository);
    const dish = await dishesCreateService.execute({name, description, price, category, ingredients});

    return response.status(201).json(dish);
  }

  async index(request, response) {
    const { name, category, ingredients } = request.query;

    const dishesRepository = new DishesRepository();
    const dishesIndexService = new DishesIndexService(dishesRepository);
    const dishes = await dishesIndexService.execute({ name, category, ingredients });

    return response.json(dishes);
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex('dishes').where({ id }).first();

    if(!dish){
      throw new AppError('Prato inexistente.', 404);
    }

    const ingredients = await knex('ingredients')
    .where({ dishes_id: id })
    .orderBy('name');

    return response.json({
      ...dish,
      ingredients
    });
    
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, price, category, ingredients } = request.body;

    const dishesRepository = new DishesRepository();
    const dishesUpdateService = new DishesUpdateService(dishesRepository);
    const dish = await dishesUpdateService.execute({ id, name, description, price, category, ingredients });

    return response.json(dish)
  }


  async delete(request, response) {
    const { id } = request.params;

    await knex('dishes').where({ id }).delete();
    return response.status(204).json({
      message: 'Prato deletado com sucesso!'
    });
  }
}

module.exports = DishesController;