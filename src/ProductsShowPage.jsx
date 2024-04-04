import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function ProductsShowPage() {
  const [product, setProduct] = useState({});
  const params = useParams();

  const handleShowProduct = () => {
    axios.get(`http://localhost:3000/products/${params.id}.json`).then((response) => {
      console.log(response);
      setProduct(response.data);
    });
  };

  useEffect(handleShowProduct, []);

  return (
    <div>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Image: {product.primary_image}</p>
      <p>Supplier id: {product.supplier_id}</p>
      <Link to="/products">Back to all products</Link>
    </div>
  );
}
