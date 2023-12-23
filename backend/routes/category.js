const express = require("express");
const categoryController = require("../controllers/category");

const router = express.Router();

router.get("/", categoryController.getAllCategory);

router.get("/:id", categoryController.getIdCategory);

router.post("/", categoryController.createCategory);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
