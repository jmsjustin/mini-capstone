/* eslint-disable no-undef */
import axios from "axios";
import { useState, useEffect } from "react";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { ProductsShow } from "./ProductsShow";
import { ProductsShowPage } from "./ProductsShowPage";
import { Modal } from "./Modal";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mini-capstone-api-87e3.onrender.com";

export function Content() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndexProducts = () => {
    console.log("handleIndexProducts");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const handleCreateProduct = (params, successCallback) => {
    console.log("handleCreateProduct", params);
    axios.post("http://localhost:3000/products.json", params).then((response) => {
      setProducts([...products, response.data]);
      successCallback();
    });
  };

  const handleShowProduct = (product) => {
    console.log("handleShowProduct", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleUpdateProduct = (id, params, successCallback) => {
    console.log("handleUpdateProduct", params);
    axios.patch(`http://localhost:3000/products/${id}.json`, params).then((response) => {
      setProducts(
        products.map((product) => {
          if (product.id === response.data.id) {
            return response.data;
          } else {
            return product;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyProduct = (id) => {
    console.log("handleDestroyProduct", id);
    // eslint-disable-next-line no-unused-vars
    axios.delete(`http://localhost:3000/products/${id}.json`).then((response) => {
      setProducts(products.filter((product) => product.id !== id));
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsProductsShowVisible(false);
  };

  useEffect(handleIndexProducts, []);

  return (
    <main className="container">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />} />
        <Route path="/products" element={<ProductsIndex products={products} onShowProduct={handleShowProduct} />} />
        <Route path="/products/new" element={<ProductsNew onCreateProduct={handleCreateProduct} />} />
        <Route path="/products/:id" element={<ProductsShowPage />} />
      </Routes>
      <Modal show={isProductsShowVisible} onClose={handleClose}>
        <ProductsShow
          product={currentProduct}
          onUpdateProduct={handleUpdateProduct}
          onDestroyProduct={handleDestroyProduct}
        />
      </Modal>
    </main>
  );
}
