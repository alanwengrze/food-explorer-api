const knex = require('../database/knex');
const AppError = require('../utils/AppError');
class DishesController {

  async create(request, response) {
    const {name, description, price, category, ingredients} = request.body;

    const [ dishes_id ] = await knex('dishes').insert({
      name,
      description,
      price,
      category
    });

      const ingredientsInsert = ingredients.map(name =>{
        return{
          name,
          dishes_id
        }
    });
    await knex('ingredients').insert(ingredientsInsert);

    return response.status(201).json({
      dishes_id,
      ingredientsInsert
    });
  }
}

module.exports = DishesController;