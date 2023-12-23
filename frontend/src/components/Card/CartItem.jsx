import { useContext } from "react";
import cardContext from "../../context/CardContext";

const CartItem = ({ item }) => {
  const { handleClickRemoveToCard } = useContext(cardContext);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={item.img[0]} alt="" />
        <i
          onClick={() => handleClickRemoveToCard(item._id)}
          className="bi bi-x delete-cart"
          data-id="1"></i>
      </td>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td className="product-quantity">{item.quantity}</td>
      <td className="product-subtotal">
        ${(item.price * item.quantity)}
      </td>
    </tr>
  );
};

export default CartItem;
