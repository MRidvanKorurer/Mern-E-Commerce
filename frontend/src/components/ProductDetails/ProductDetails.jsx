import Breadcrumb from "./Breadcrumb/breadcrumb";
import "./ProductDetails.css";
import Tabs from "./Tabs/Tabs";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";

const ProductDetails = ({singleProduct, setSingleProduct}) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct}/>
              <Info singleProduct={singleProduct}/>
            </main>
          </div>
          <Tabs singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;