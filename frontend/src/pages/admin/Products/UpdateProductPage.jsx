import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

// console.log(singleProduct);



  useEffect(() => {
    const getData = async () => {
      try {
        const [categoryResponse, singleProductResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/categories`),
          axios.get(`${apiUrl}/api/products/${productId}`),
        ]);

        // if (!categoryResponse.ok || !productResponse.ok) {
        //    message.error("Veri getirme başarısız!");
        // }

        const [categoryData, singleProductData] = await Promise.all([
          categoryResponse.data,
          singleProductResponse.data,
        ]);


        setCategories(categoryData.categories);

        if(singleProductData) {
          form.setFieldsValue({
            name: singleProductData.product.name,
            current: singleProductData.product.price.current,
            discount: singleProductData.product.price.discount,
            description: singleProductData.product.description,
            img: singleProductData.product.img.join("\n"),
            colors: singleProductData.product.colors.join("\n"),
            sizes: singleProductData.product.sizes.join("\n"),
            category: singleProductData.product.category
          })
        }

      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [apiUrl, productId, form]);




  const onFinish = async (values) => {
    try {
      console.log(values);
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Ürün başarıyla güncellendi.");
        navigate("/admin/products");
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
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
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductPage;
