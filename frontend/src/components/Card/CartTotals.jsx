import { useContext, useState } from "react";
import cardContext from "../../context/CardContext";
import { Spin, message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const CartTotals = () => {
  const { cardItem } = useContext(cardContext);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;

  const [fastCargoChecked, setFastCargoChecked] = useState(false);

  const cardItemTotals = cardItem.map((item) => {
    const itemTotal = item.price * item.quantity;

    return itemTotal;
  });

  const cargoFee = 15;

  const subTotal = cardItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cardTotal = fastCargoChecked
    ? (subTotal + cargoFee).toFixed(2)
    : subTotal.toFixed(2);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;


    

  const handlePayment = async () => {
    setLoading(true);
    if (!user) {
      return message.info("Ödeme yapmak için giriş yapmalısınız!");
    }

    const body = {
      products: cardItem,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);
      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if(!res.ok) {
        message.error("Ödeme işlemi başarısız!");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if(result.error) {
        throw new Error(result.error.message);
      }

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(true);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotal.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cardTotal}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <Spin spinning={loading}>
        <button onClick={handlePayment} className="btn btn-lg">
          Proceed to checkout
        </button>
        </Spin>
      </div>
    </div>
  );
};

export default CartTotals;
