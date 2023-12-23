import React, { useContext, useState } from "react";
import cardContext from "../../context/CardContext";
import { message } from "antd";

const CartCoupon = () => {
  const { setCardItem, cardItem } = useContext(cardContext);

  const [couponCode, setCouponCode] = useState("");

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async (e) => {
    e.preventDefault();

    if (couponCode.trim().length === 0) {
      return message.warning("boş değer girilemez!");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.error("Kupon kodu hatalı!");
      }

      const data = await res.json();

      const discountPercent = data.discountPercent;

      const updatedCardItems = cardItem.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);

        return { ...item, price: updatePrice };
      });

      setCardItem(updatedCardItems);

      message.success(`"${couponCode}" kupon kodu başarıyla uygulandı!`);
      setCouponCode("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          type="text"
          className="input-text"
          placeholder="Coupon code"
        />
        <button type="button" onClick={applyCoupon} className="btn">
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
