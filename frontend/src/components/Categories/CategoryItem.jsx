import "./CategoryItem.css"

const CategoryItem = ({item}) => {
  return (
    <li className="category-item">
      <a href="#">
        <img
          src={item.img}
          alt=""
          className="category-image "
        />
        <span className="category-title mt-8">{item.name}</span>
      </a>
    </li>
  );
};

export default CategoryItem;