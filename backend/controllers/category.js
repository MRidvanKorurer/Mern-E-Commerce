const Category = require("../models/category");

module.exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "OK",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.getIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "category not fount",
      });
    }

    res.status(200).json({
      status: "OK",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.createCategory = async (req, res) => {
  try {
    const { name, img } = req.body;
    const newCategory = await Category.create({ name, img });
    res.status(201).json({
      status: "OK",
      newCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updates, {
      new: true,
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    res.status(200).json({
      status: "OK",
      deleted,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
