const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class DishesImageController {

  async create (request, response) {
    const imageDish = request.file.filename;
    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageDish);

    const dish = await knex('dishes').insert({ image: filename });
    return response.json(dish);
  }

  async update(request, response) {
    const { id } = request.params;
    const imageDish = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex('dishes').where({ id }).first();

    if(dish.image){
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(imageDish);

    dish.image = filename;

    await knex('dishes').where({ id }).update({ image: filename });

    return response.json(dish);
  }
}

module.exports = DishesImageController;