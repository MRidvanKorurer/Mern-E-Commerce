const Product = require("../models/product.js");

module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "OK",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.getIdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "product not fount",
      });
    }

    res.status(200).json({
      status: "OK",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json({
      status: "OK",
      newProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    const updates = req.body;

    if (!existingProduct) {
      return res.status(400).json({ error: "Product not fount!" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: "OK",
      deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};


module.exports.searchProduct = async (req, res) => {
  try {
    const productName = req.params.productName;

    const products = await Product.find({
      name: { $regex: productName, $options: "i" }
    });

    res.status(200).json({
      status: "OK",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
}
