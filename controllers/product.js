const Product = require("../models/product");

// get all products in db
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// get a product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "cannot find product" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

// create new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "cannot find product" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json({
      success: true,
      message: "product has been updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "cannot find product" });
    }

    res.status(200).json({
      success: true,
      message: "product has been deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
