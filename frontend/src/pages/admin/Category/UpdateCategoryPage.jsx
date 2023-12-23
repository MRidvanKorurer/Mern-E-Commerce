import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
      } else {
        message.error("Kategori güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        console.log(data);

        if (data) {
          form.setFieldsValue({
            name: data.category.name,
            img: data.category.img,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
      }
    };
    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}>
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
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCategoryPage;
