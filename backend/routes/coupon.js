const express = require("express");
const couponController = require("../controllers/coupon.js");

const router = express.Router();

router.get("/", couponController.getAllCoupon);

router.get("/:id", couponController.getIdCoupon);

router.get("/code/:couponCode", couponController.getCouponCode);

router.post("/", couponController.createCoupon);

router.put("/:id", couponController.updateCoupon);

router.delete("/:id", couponController.deleteCoupon);

module.exports = router;
