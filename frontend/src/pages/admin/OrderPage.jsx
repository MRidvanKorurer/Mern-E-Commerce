import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";


const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const MY_STRİPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch(`https://api.stripe.com/v1/payment_intents`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MY_STRİPE_SECRET_KEY}`
          }
        });
        console.log(response);

        if(response.ok) {
          const {data} = await response.json();
          setDataSource(data);
        }

      } catch (error) {
        console.error(error);
      }
    }
    getOrders();
  }, [MY_STRİPE_SECRET_KEY]);

  console.log(dataSource);
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 ">Müşteri Email</th>
                  <th className="px-4 py-3">Sipariş Fiyatı</th>
                </tr>
              </thead>
              {dataSource.map((item) => {
                return (
                  <tbody key={item.id} className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative bg-green-900 text-white rounded-3xl p-1">
                              <p className=" font-bold text-sm">{item.receipt_email}</p>
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-bold border italic">${(item.amount / 100).toFixed(2)}</td>
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

export default OrderPage;
