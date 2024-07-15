const AppError = require('../utils/AppError');
class UsersController {
  async create(request, response) {
    const { name, email } = request.body;

    if(!name || !email) {
      throw new AppError('Name and email are required', 400);
    }
    
    response.status(201).json({name, email})
  }
}

module.exports = UsersController;