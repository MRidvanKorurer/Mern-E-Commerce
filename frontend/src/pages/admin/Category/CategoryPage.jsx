import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  async function getCategories() {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      console.log(response);
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickDelete = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/api/categories/${categoryId}`);
      message.success("Kategori silindi");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

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
                  <th className="px-4 py-3 ">Category Image</th>
                  <th className="px-4 py-3">Category Name</th>
                  <th className="px-4 py-3">Category Date</th>
                </tr>
              </thead>
              {categories.map((item) => {
                return (
                  <tbody key={item._id} className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-20 h-20 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full "
                              src={item.img}
                              alt="avatar"
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-bold border">{item.name}</td>
                      <td className="px-4 py-3 text-ms font-light border">
                        {item.createdAt}
                      </td>

                      <td className="px-4 py-3 text-sm border">
                        <button
                          onClick={() => handleClickDelete(item._id)}
                          className=" mr-4 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-all">
                          Delete
                        </button>
                        <button
                          onClick={() => navigate(`/admin/categories/update/${item._id}`)}
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

export default CategoryPage;
