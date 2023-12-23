import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const handleClickDelete = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/api/products/${productId}`);
      message.success("Ürün silindi");
      // getCategories();
      setCategories((prevProduct) => {
        return prevProduct.filter((product) => product._id !== productId)
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/categories`),
          axios.get(`${apiUrl}/api/products`),
        ]);

        // if (!categoryResponse.ok || !productResponse.ok) {
        //    message.error("Veri getirme başarısız!");
        // }

        const [categoryData, productData] = await Promise.all([
          categoryResponse.data,
          productResponse.data,
        ]);

        const productWithCategory = productData.products.map((product) => {
          const categoryId = product.category;
          const category = categoryData.categories.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            category: category ? category.name : "",
          };
        });

        setCategories(productWithCategory);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [apiUrl]);


  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 ">Product Image</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Discount</th>

                </tr>
              </thead>
              {categories.map((item) => {
                return (
                  <tbody key={item._id} className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-24 h-20 mr-3  md:block">
                            <img
                              className=" w-full h-full "
                              src={item.img[0]}
                              alt="avatar"
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 shadow-inner"
                              aria-hidden="true"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-bold border">{item.name}</td>
                      <td className="px-4 py-3 text-ms font-bold border">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-ms font-bold border">
                        ₺{item.price.current}
                      </td>
                      <td className="px-4 py-3 text-ms font-bold border">
                        %{item.price.discount}
                      </td>

                      <td className="px-4 py-3 text-sm border">
                        <button
                          onClick={() => handleClickDelete(item._id)}
                          className=" mr-4 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-all">
                          Delete
                        </button>
                        <button
                          onClick={() => navigate(`/admin/products/update/${item._id}`)}
                          className=" bg-blue-600 text-white p-1 rounded hover:bg-blue-700 transition-all">
                          Update
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
