import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon başarıyla güncellendi.");
      } else {
        message.error("Kupon güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        console.log(data);

        if (data) {
          form.setFieldsValue({
            code: data.coupon.code,
            discountPercent: data.coupon.discountPercent,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
      }
    };
    fetchSingleCategory();
  }, [apiUrl, couponId, form]);

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}>
      <Form.Item
        label="Kupon Kodu"
        name="code"
        rules={[
          {
            required: true,
            message: "Lütfen kupon kodunu girin!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Kupon Oranı"
        name="discountPercent"
        rules={[
          {
            required: true,
            message: "Lütfen kupon oranını girin!",
          },
        ]}>
        <InputNumber />
      </Form.Item>

      <Form.Item>
        <Button
          className=" bg-blue-600 text-white rounded hover:bg-blue-700 hover:text-white transition-all w-32 p-1"
          htmlType="submit"
          type="primary">
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCouponPage;
