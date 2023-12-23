import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  async function getUser() {
    try {
      const response = await axios.get(`${apiUrl}/api/users`);
      console.log(response);
      setDataSource(response.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickDelete = async (userEmail) => {
    try {
      if (window.confirm("Kullanıcıyı silmek isteğinize emin misiniz?")) {
        const response = await axios.delete(`${apiUrl}/api/users/${userEmail}`);
        console.log(response);
        message.success("Kullanıcı silindi");
        getUser();
      } else {
        await message.warning("Silme işlemi başarısız");
        window.location.href = "/admin/users";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // console.log(dataSource);

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            {dataSource.map((item) => {
              return (
                <tbody key={item._id} className="bg-white">
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-12 h-12 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={item.avatar}
                            alt="avatar"
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {item.username}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {" "}
                        {item.email}{" "}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{item.role}</td>
                    <td className="px-4 py-3 text-sm border">
                      <button
                        onClick={() => handleClickDelete(item.email)}
                        className=" bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-all">
                        Delete
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
  );
};

export default AdminUserPage;
