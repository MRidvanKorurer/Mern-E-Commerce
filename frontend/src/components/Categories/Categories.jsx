import CategoryItem from "./CategoryItem";
import "./Categories.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios("http://localhost:3000/api/categories");
        // console.log(response);
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categories.map((item) => {
            return(
              <CategoryItem key={item._id} item={item}/>
            )
          })}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
