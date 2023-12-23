import React, { useEffect, useState } from "react";

const cardContext = React.createContext();

const CardProvider = ({ children }) => {
  const [cardItem, setCardItem] = useState(
    localStorage.getItem("cardItem") ? JSON.parse(localStorage.getItem("cardItem")) : []
  );

  useEffect(() => {
    localStorage.setItem("cardItem", JSON.stringify(cardItem));
  }, [cardItem]);

  const handleClickAddToCard = (product) => {
    setCardItem((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: product.quantity ? product.quantity : 1,
      },
    ]);
  };

  const handleClickRemoveToCard = (itemId) => {
    const filteredCard = cardItem.filter((item) => {
      return item._id !== itemId;
    });
    setCardItem(filteredCard);
  };

  const sharedValuesAndMethods = {
    cardItem,
    setCardItem,
    handleClickAddToCard,
    handleClickRemoveToCard,
  };

  return (
    <cardContext.Provider value={sharedValuesAndMethods}>{children}</cardContext.Provider>
  );
};

export { CardProvider };
export default cardContext;
