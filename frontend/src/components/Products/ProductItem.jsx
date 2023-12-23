import { useContext } from "react";
import "./ProductItem.css";
import cardContext from "../../context/CardContext";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  const { handleClickAddToCard, cardItem } = useContext(cardContext);

  const filteredCard = cardItem.find((card) => card._id === item._id);

  const originalPrice = item.price.current;
  const discountPercentage = item.price.discount;

  const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={item.img[0]} alt="" className="img1" />
          <img src={item.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {item.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(3)}</strong>
          <span className="old-price">${originalPrice}</span>
        </div>
        <span className="product-discount">-{item.price.discount}%</span>
        <div className="product-links">
          <button
            disabled={filteredCard}
            onClick={() => handleClickAddToCard({
              ...item,
              price: discountedPrice
            })}
            className="add-to-cart">
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${item._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
