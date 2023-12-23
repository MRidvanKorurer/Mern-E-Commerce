import { Fragment, useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
  const [singleProduct, setSingleProduct] = useState(null);

  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios(`${apiUrl}/api/products/${productId}`);
        // console.log(response);
        setSingleProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();

  }, [productId, apiUrl]);
  

  return (
    <Fragment>
      {
        singleProduct ? <ProductDetails singleProduct={singleProduct} setSingleProduct={setSingleProduct}/> : <p>ürün bulunamadı!!!</p>
      }
    </Fragment>
  );
};

export default ProductDetailsPage;
