import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  async function getCategories() {
    try {
      const response = await axios.get(`${apiUrl}/api/coupons`);
      console.log(response);
      setCategories(response.data.coupon);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickDelete = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/api/coupons/${categoryId}`);
      message.success("Kategori silindi");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUpdate = (id) => {
    navigate(`/admin/coupons/update/${id}`)
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">

                  <th className="px-4 py-3">Coupon Name</th>
                  <th className="px-4 py-3">Coupon Discound</th>
                </tr>
              </thead>
              {categories.map((item) => {
                return (
                  <tbody key={item._id} className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-ms font-bold border">{item.code}</td>
                      <td className="px-4 py-3 text-ms font-light border">
                        %{item.discountPercent}
                      </td>

                      <td className="px-4 py-3 text-sm border">
                        <button
                          onClick={() => handleClickDelete(item._id)}
                          className=" mr-4 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-all">
                          Delete
                        </button>
                        <button
                          onClick={() => handleClickUpdate(item._id)}
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

export default CouponPage;
