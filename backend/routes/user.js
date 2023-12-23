const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/", userController.getAllUser);

router.delete("/:email", userController.deletelUser);

module.exports = router;
