import { useContext } from "react";
import CartItem from "./CartItem";
import cardContext from "../../context/CardContext";

const CartTable = () => {
  const {cardItem} = useContext(cardContext);

  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {
          cardItem.map((item) => {
            return(
              <CartItem key={item._id} item={item}/>
            )
          })
        }
      </tbody>
    </table>
  );
};

export default CartTable;