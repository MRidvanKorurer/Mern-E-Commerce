import React, { useState } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";

const CreateCouponPage = () => {
  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
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
          Oluştur
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCouponPage;
