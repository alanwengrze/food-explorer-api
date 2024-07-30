class DishesRepositoryInMemory {
  dishes = [];

  async create({ name, description, price, category, ingredients, image }) {
    const dish = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      description,
      price,
      category,
      ingredients,
      image
    }

    this.dishes.push(dish);
    return dish;
  }

  async findByName(name) {
    const dish = this.dishes.find(dish => dish.name === name);
    return dish;
  }
}

module.exports = DishesRepositoryInMemory;