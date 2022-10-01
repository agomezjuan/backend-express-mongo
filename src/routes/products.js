import express from "express";

import Product from "./models/products.js";

const router = express.Router();

router.post("/api/products", (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Producto creado",
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error al crear el producto",
      });
    });
});

// obtener todos los productos
router.get("/api/products", (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error al obtener los productos",
      });
    });
});

// obtener un producto por id
router.get("/api/products/:id", (req, res) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
});

// eliminar un producto por id
router.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }).then(product => {
    if (product) {
      res.status(200).json({
        message: "Producto eliminado",
      });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
});

// actualizar un producto por id
router.put("/api/products/:id", (req, res) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  });
  Product.updateOne({ _id: req.params.id }, product).then(product => {
    if (product) {
      res.status(200).json({
        message: "Producto actualizado",
      });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  });
});

export default router;
