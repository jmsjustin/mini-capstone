/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export function ProductsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div>
      <h1>All Products</h1>
      Search filter:{" "}
      <input
        type="text"
        list="titles"
        className="form-control"
        id="exampleDataList"
        placeholder="Type to search..."
        value={searchFilter}
        onChange={(event) => setSearchFilter(event.target.value)}
      />
      <datalist id="titles">
        {props.products.map((product) => (
          <option key={product.id}>{product.name}</option>
        ))}
      </datalist>
      <div className="cards">
        {props.products
          .filter((product) => product.name.toLowerCase().includes(searchFilter.toLowerCase()))
          .map((products) => (
            <div key={products.id} className="products card">
              <div className="card">
                <img src={products.primary_image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{products.name}</h5>
                  <p className="card-text">Description: {products.description}</p>
                  <button className="btn btn-primary" onClick={() => props.onShowProduct(products)}>
                    More info
                  </button>
                  <div>
                    <Link to={`/products/${products.id}`}>More info on separate page</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
