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

  async index(request, response) {
    const { name, category, ingredients } = request.query;
    let dishes;

    if(!name && !category && !ingredients){
      dishes = await knex('dishes')
      .select('*')
      .orderBy('name');
    }

    if(ingredients){
      dishes = await knex('ingredients')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price',
        'dishes.category',
      ])
      .whereLike("ingredients.name", `%${ingredients}%`)
      .innerJoin('dishes', 'dishes.id', 'ingredients.dishes_id')
      .groupBy('dishes.id')
      .orderBy('dishes.name');
    }

    if(category){
      dishes = await knex('dishes')
      .select('*')
      .where('category', category)
      .orderBy('name');
    }

    const dishIngredients = await knex('ingredients').select('*');

    const dishesWithIngredients = dishes.map(dish => {
      const ingredientsWithDishId = dishIngredients.filter(ingredient => ingredient.dishes_id === dish.id);
      const [...ingredientName] = ingredientsWithDishId.map(ingredient => ingredient.name);
      return{
        ...dish,
        ingredients: ingredientName
      }
    });

    return response.json(dishesWithIngredients);
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

    await knex('dishes').where({ id }).update({
      name,
      description,
      price,
      category
    });

    if(ingredients){
      const ingredientsArray = ingredients.map(ingredient => ingredient.trim());

      await knex('ingredients').where({ dishes_id: id }).delete();

      const ingredientsInsert = ingredientsArray.map(name =>{
        return{
          name,
          dishes_id: id
        }
      });

      await knex('ingredients').insert(ingredientsInsert);
    }

    return response.json()
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