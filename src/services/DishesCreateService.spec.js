const DishesCreateService = require('./DishesCreateService');
const DishesRepositoryInMemory = require('../repositories/DishesRepositoryInMemory');

describe('DishesCreateService', () => {
  let dishesRepository = null;
  let dishesCreateService = null;

  beforeEach(() => {
    dishesRepository = new DishesRepositoryInMemory();
    dishesCreateService = new DishesCreateService(dishesRepository);
  })

  //create a image in tmp folder named image.jpg to test

  test("Should be able to create a new dish", async () => {
    const dish = {
      name: "Arroz e Feijão",
      description: "Arroz e Feijão",
      price: 10,
      category: "meal",
      ingredients: ["Arroz", "Feijão"],
      image: "image.jpg"
    }

    const createdDish = await dishesCreateService.execute(dish);
  
    expect(createdDish).toHaveProperty("id");
  });
  
   test("Should price be greater than R$2,00 and less than R$500,00", async () => {
     const dish = {
       name: "Arroz e Feijão",
       description: "Arroz e Feijão",
       price: 1,
       category: "meal",
       ingredients: ["Arroz", "Feijão"],
       image: "image.jpg"
     }
 
     await expect(dishesCreateService.execute(dish)).rejects.toEqual({
       message: "O preço deve ser maior que R$2,00 e menor que R$500,00.",
       statusCode: 400
     })
   })

   test("Should be able to create a new dish that exists", async () => {
    const dish = {
      name: "Arroz e Feijão",
      description: "Arroz e Feijão",
      price: 2,
      category: "meal",
      ingredients: ["Arroz", "Feijão"],
      image: "image.jpg"
    }

    await dishesCreateService.execute(dish);

    await expect(dishesCreateService.execute(dish)).rejects.toEqual({
      message: "Esse prato já existe.",
      statusCode: 400
    })
  })

});