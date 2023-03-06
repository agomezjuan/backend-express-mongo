import express from "express";
import auth from "../middlewares/auth.js"

import productController from "../controllers/products.js";
import { productValidator } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", auth, productValidator, productController.createProduct);

// obtener todos los productos
router.get("/", productController.getProducts);

// obtener un producto por id
router.get("/:id", productController.getOneProduct);

// obtener producto por nombre
router.get("/name/:name", productController.getOneProductByName);

// eliminar un producto por id
router.delete("/:id", productController.deleteProduct);

// actualizar un producto por id
router.put("/:id", auth, productValidator, productController.updateProduct);

export default router;
