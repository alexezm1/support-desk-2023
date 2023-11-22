import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getProductsData } from "../features/products/productSlice";

function NewTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    user_id: user ? user.id : null,
    name: user ? user.name : null,
    product: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);

  const { user_id, name, product, description } = formData;

  const selectOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      product: e.target.value,
    }));
  };

  const descriptionOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const createTicket = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Create New ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <form onSubmit={createTicket}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={selectOnChange}
            >
              {products?.map((product) => {
                return (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue:</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={descriptionOnChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
