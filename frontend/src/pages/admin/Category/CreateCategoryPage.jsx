import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";

const CreateCategoryPage = () => {
  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kategori başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Kategori oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Kategori İsmi"
        name="name"
        rules={[
          {
            required: true,
            message: "Lütfen kategori adını girin!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Kategori Görseli"
        name="img"
        rules={[
          {
            required: true,
            message: "Lütfen kategori görselini (link) girin!",
          },
        ]}>
        <Input />
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

export default CreateCategoryPage;
