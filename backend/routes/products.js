const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getIdProduct);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

router.get("/search/:productName", productController.searchProduct);

module.exports = router;
