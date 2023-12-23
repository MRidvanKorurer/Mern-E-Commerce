const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reviewSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  raiting: {
    type: Number,
    // required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
},{ timestamps: true });

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [reviewSchema],
    description: {
      type: String,
      required: true,
    },
    price: {
      current: { type: Number, required: true },
      discount: { type: Number },
    },
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
