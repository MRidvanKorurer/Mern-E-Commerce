const express = require("express");
const paymentController = require("../controllers/payment");

const router = express.Router();

router.post("/", paymentController.payment);

module.exports = router;