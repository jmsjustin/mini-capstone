/* eslint-disable react/prop-types */
export function ProductsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateProduct(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          Name: <input className="form-control" name="name" type="text" />
        </div>
        <div className="mb-3">
          Price: <input className="form-control" name="price" type="text" />
        </div>
        <div className="mb-3">
          Description: <input className="form-control" name="description" type="text" />
        </div>
        <div className="mb-3">
          Image: <input className="form-control" name="image" type="text" />
        </div>
        <div className="mb-3">
          Supplier id: <input className="form-control" name="supplier_id" type="text" />
        </div>
        <button className="btn btn-primary mb-3" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
}
