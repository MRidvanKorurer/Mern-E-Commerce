import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        } else {
          message.error("Veri getirme hatası!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    try {
      const imgLinks = values.img.split("\n").map((link) => link.trim());
      const sizes = values.sizes.split("\n").map((link) => link.trim());
      const colors = values.colors.split("\n").map((link) => link.trim());

      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          sizes,
          colors,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("Ürün başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Ürün oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Ürün İsmi"
        name="name"
        rules={[
          {
            required: true,
            message: "Lütfen ürün adını girin!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Ürün Kategorisi"
        name="category"
        rules={[
          {
            required: true,
            message: "Lütfen en az 1 kategori seçin!",
          },
        ]}>
        <Select>
          {categories.map((item) => (
            <Select.Option value={item._id} key={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Fiyat"
        name="current"
        rules={[
          {
            required: true,
            message: "Lütfen ürün fiyatını girin!",
          },
        ]}>
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="İndrimin Oranı"
        name="discount"
        rules={[
          {
            required: true,
            message: "Lütfen ürün fiyatını girin!",
          },
        ]}>
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Ürün Açıklaması"
        name="description"
        rules={[
          {
            required: true,
            message: "Lütfen ürün açıklaması girin!",
          },
        ]}>
        <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
      </Form.Item>

      <Form.Item
        label="Ürün Görselleri"
        name="img"
        rules={[
          {
            required: true,
            message: "Lütfen en az 4 ürün görsel linki girin!",
          },
        ]}>
        <Input.TextArea
          autoSize={{ minRows: 4 }}
          placeholder="Herbir görsel linkini yeni bir satıra yazın"
        />
      </Form.Item>

      <Form.Item
        label="Ürün Renkleri"
        name="colors"
        rules={[
          {
            required: true,
            message: "Lütfen en az 1 ürün renk linki girin!",
          },
        ]}>
        <Input.TextArea
          autoSize={{ minRows: 4 }}
          placeholder="Herbir renk linkini yeni bir satıra yazın"
        />
      </Form.Item>

      <Form.Item
        label="Ürün Bedenleri"
        name="sizes"
        rules={[
          {
            required: true,
            message: "Lütfen en az 1 ürün bedeni girin!",
          },
        ]}>
        <Input.TextArea
          autoSize={{ minRows: 4 }}
          placeholder="Herbir ürün bedenini yeni bir satıra yazın"
        />
      </Form.Item>

      <Form.Item>
        <Button className=" bg-blue-600" type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductPage;
