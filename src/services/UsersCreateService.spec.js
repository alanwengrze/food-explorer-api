const UsersCreateService = require('./UsersCreateService');
const UsersRepositoryInMemory = require('../repositories/UsersRepositoryInMemory');
const AppError = require('../utils/AppError');
describe('UsersCreateService', () => {
  let userRepository = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();
    userCreateService = new UsersCreateService(userRepository);
  })

  test("Should be able to create a new user", async () => {
    const user = {
      name: "John",
      email: "bqZiJ@example.com",
      password: "@Jackass123"
    }
  
    const createdUser = await userCreateService.execute(user);
  
    expect(createdUser).toHaveProperty("id");
  })
  
  test("user not should be created with exists email", async () => {
    const user1 = {
      name: "user test 1",
      email: "user@test.com",
      password: "@Test123"
    };
    const user2 = {
      name: "user test 2",
      email: "user@test.com",
      password: "@est123"
    }

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual({
      message: "Esse e-mail já está em uso.",
      statusCode: 400});
  });

  test("user not should be created with invalid email", async () => {
    const user = {
      name: "John",
      email: "bqZiJexample.com",
      password: "@Test123"
    }

    await expect(userCreateService.execute(user)).rejects.toEqual({
      message: "O e-mail informado é inválido.",
      statusCode: 400
    })
  })

  test("user not should be created with invalid password", async () => {
    const user = {
      name: "John",
      email: "bqZiJ@example.com",
      password: "est123"
    }

    await expect(userCreateService.execute(user)).rejects.toEqual({
      message: "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um caractere especial e um número.",
      statusCode: 400
    })
  })

})