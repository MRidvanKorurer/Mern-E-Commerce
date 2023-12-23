const Coupon = require("../models/coupon.js");

module.exports.getAllCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.status(200).json({
      status: "OK",
      coupon,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.getIdCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        message: "coupon not fount",
      });
    }

    res.status(200).json({
      status: "OK",
      coupon,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.getCouponCode = async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({
        message: "coupon not fount",
      });
    }

    const { discountPercent } = coupon;

    res.status(200).json({
      status: "OK",
      discountPercent,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.createCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const existingCode = await Coupon.findOne({ code });

    if (existingCode) {
      return res.status(400).json({
        message: "this coupon is already exists",
      });
    }

    const newCoupon = new Coupon(req.body);

    await newCoupon.save();

    res.status(201).json({
      status: "OK",
      newCoupon,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.updateCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;

    const existingCoupon = await Coupon.findById(couponId);
    const updates = req.body;

    if (!existingCoupon) {
      return res.status(400).json({ error: "Coupon not fount!" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      updatedCoupon,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.status(200).json({
      status: "OK",
      deletedCoupon,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
