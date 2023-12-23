import { useState } from "react";
import Reviews from "../../Reviews/Reviews";
import "./Tabs.css";


const Tabs = ({singleProduct, setSingleProduct}) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tabs) => {
    e.preventDefault();
    setActiveTab(tabs);
  }

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a  onClick={(e) => {handleTabClick(e, "desc")}} href="#" className={`tab-button ${activeTab === "desc" ? "active" : ""}`}>
            Description
          </a>
        </li>
        <li>
          <a onClick={(e) => {handleTabClick(e, "info")}} href="#" className={`tab-button ${activeTab === "info" ? "active" : ""}`}>
            Additional information
          </a>
        </li>
        <li>
          <a onClick={(e) => {handleTabClick(e, "reviews")}} href="#" className={`tab-button ${activeTab === "reviews" ? "active" : ""}`} >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div dangerouslySetInnerHTML={{ __html: singleProduct.description }} className={`tab-panel-descriptions content  ${activeTab === "desc" ? " active" : ""}`} id="desc">
        </div>
        <div className={`tab-panel-information content ${activeTab === "info" ? " active" : ""}`} id="info">
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  {singleProduct.sizes.map((size, index) => {
                    return(
                      <span key={index}>{size.toUpperCase()}
                        {index < singleProduct.sizes.length - 1 && ", "}
                      </span>
                    )
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews setSingleProduct={setSingleProduct} singleProduct={singleProduct} active={activeTab === "reviews" ? "content active" : "content"}/> 
      </div>
    </div>
  );
};

export default Tabs;
