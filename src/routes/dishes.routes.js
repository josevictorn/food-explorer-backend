const { Router } = require('express');
const multer = require('multer');
const uploadsConfig = require('../configs/upload');

const DishesController = require('../controllers/DishesController');
const DishesImageController = require('../controllers/DishesImageControler')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin');

const dishesRoutes = new Router();
const upload = multer(uploadsConfig.MULTER);

const dishesController = new DishesController();
const dishesImageController = new DishesImageController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.post("/", ensureUserIsAdmin, dishesController.create);
dishesRoutes.patch("/:id/upload", ensureUserIsAdmin, upload.single("image"), dishesImageController.update);
dishesRoutes.put("/:id", ensureAuthenticated, ensureUserIsAdmin, dishesController.update);
dishesRoutes.delete("/:id", ensureUserIsAdmin, dishesController.delete);
dishesRoutes.delete("/:id/deleteImage", ensureUserIsAdmin, dishesImageController.delete);

module.exports = dishesRoutes;