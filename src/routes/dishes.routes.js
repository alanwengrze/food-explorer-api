const { Router } = require("express");
const DishesController = require("../controllers/DishesController");

const dishesController = new DishesController();
const dishesRoutes = Router();

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;