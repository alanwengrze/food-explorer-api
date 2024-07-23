const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const DishesImageController = require("../controllers/DishesImageController");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesController = new DishesController();
const dishesRoutes = Router();

const dishesImageController = new DishesImageController();


const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", verifyUserAuthorization(['admin']), dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", verifyUserAuthorization(['admin']), dishesController.update);
dishesRoutes.delete("/:id", verifyUserAuthorization(['admin']), dishesController.delete);

dishesRoutes.patch("/:id/image", verifyUserAuthorization(['admin']), upload.single('image'), dishesImageController.update);

dishesRoutes.post("/image", verifyUserAuthorization(['admin']), upload.single('image'), dishesImageController.create);


module.exports = dishesRoutes;