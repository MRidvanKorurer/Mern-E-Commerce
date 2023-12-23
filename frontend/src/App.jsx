import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import CategoryPage from "./pages/admin/Category/CategoryPage";
import UpdateCategoryPage from "./pages/admin/Category/UpdateCategoryPage";
import CreateCategoryPage from "./pages/admin/Category/CreateCategoryPage";
import CreateProductPage from "./pages/admin/Products/CreateProductPage";
import ProductPage from "./pages/admin/Products/ProductPage";
import UpdateProductPage from "./pages/admin/Products/UpdateProductPage";
import CouponPage from "./pages/admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/admin/Coupons/UpdateCouponPage";
import Success from "./pages/Success";
import OrderPage from "./pages/admin/OrderPage";
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/*">
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/create" element={<CreateCategoryPage />} />
          <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/update/:id" element={<UpdateProductPage />} />
          <Route path="coupons" element={<CouponPage />} />
          <Route path="coupons/create" element={<CreateCouponPage />} />
          <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
          <Route path="orders" element={<OrderPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
