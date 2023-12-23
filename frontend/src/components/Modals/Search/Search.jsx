import React, { useEffect, useState } from "react";
import "./Search.css";
import { message } from "antd";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const searchProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/products/search/${searchInput}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResults(data.products);
      } else {
        message.error("ürün bulunamadı!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">Start typing to see products you are looking for.</p>
        <form className="search-form">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            type="text"
            placeholder="Search a product"
          />
          <button onClick={searchProduct}>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div className="results">
            {results?.map((item) => {
              return (
                <a href="#" className="result-item" key={item._id}>
                  <img
                    src={item.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{item.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">${item.price.current}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={() => setIsSearchShow(false)}></i>
      </div>

      <div onClick={() => setIsSearchShow(false)} className="model-overlay"></div>
    </div>
  );
};

export default Search;
