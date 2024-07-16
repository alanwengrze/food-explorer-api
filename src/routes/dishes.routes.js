const { Router } = require("express");
const DishesController = require("../controllers/DishesController");

const dishesController = new DishesController();
const dishesRoutes = Router();

dishesRoutes.use("/", dishesController.create);

module.exports = dishesRoutes;