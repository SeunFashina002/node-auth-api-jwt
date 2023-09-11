const express = require("express");
const Product = require("../models/product");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

//get all products
router.get("", getProducts);

// get a single product
router.get("/:id", getProduct);

// create a new product
router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
