const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const conn = require("./db/db");
const categoryRoute = require("./routes/category.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/products.js");
const couponRoute = require("./routes/coupon.js");
const userRoute = require("./routes/user.js");
const paymentRoute = require("./routes/payment.js");

dotenv.config();

const app = express();

//* middleware
app.use(express.json());
app.use(cors());

//* routes
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/users", userRoute);
app.use("/api/payment", paymentRoute);

app.listen(3000, () => {
  conn();
  console.log(`Application running on port: ${3000}`);
});
