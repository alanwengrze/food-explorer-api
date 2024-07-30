const knex = require('../database/knex');
class DishesRepository {

  async findById(id) {
    const dish = await knex('dishes').where({ id }).first();
    return dish;
  }

  async findByName(name) {
    const dish = await knex('dishes').where({ name }).first();
    return dish;
  }
  async create({ name, description, price, category, ingredients, image}) {

    const [ dishes_id ] = await knex('dishes').insert({
      name,
      description,
      price,
      category,
      image
    });

    //transform string to array
    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

    //percorre o array e retorna o nome e o id
    const ingredientsInsert = ingredientsArray.map(name => {
      return {
        name,
        dishes_id
      }
    })

    //insere os ingredientes
    await knex('ingredients').insert(ingredientsInsert);

    //retorna o id
    return {
      dishes_id,
      ingredientsInsert
    }
  }

  async index({ name, category, ingredients }) {
    let dishes;

    if(!name && !category && !ingredients){
      dishes = await knex('dishes')
      .select('id', 'name', 'description', 'price', 'category', 'image')
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
        'dishes.image',
      ])
      .whereLike("ingredients.name", `%${ingredients}%`)
      .innerJoin('dishes', 'dishes.id', 'ingredients.dishes_id')
      .groupBy('dishes.id')
      .orderBy('dishes.name');
    }

    if(name){
      dishes = await knex('dishes')
      .select({
        id: 'dishes.id',
        name: 'dishes.name',
        description: 'dishes.description',
        price: 'dishes.price',
        category: 'dishes.category',
        image: 'dishes.image'
      })
      .whereLike("dishes.name", `%${name}%`)
      .orderBy('name');
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

    return dishesWithIngredients;
  }

  async update({ id, name, description, price, category, ingredients }) {


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

    const dish = await knex('dishes')
    .select({
      name: "dishes.name",
      description: "dishes.description",
      price: "dishes.price",
      category:"dishes.category",
    })
    .where({ id }).first();

    return{
      ...dish,
      ingredients
    }

  }
}

module.exports = DishesRepository;