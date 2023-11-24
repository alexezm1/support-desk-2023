import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getProductsData } from "../features/products/productSlice";
import { createTicket } from "../features/tickets/ticketSlice";

function NewTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ticket, ticketIsLoading } = useSelector((state) => state.ticket);
  const { products, productIsLoading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    user_id: user ? user.id : null,
    name: user ? user.name : null,
    product: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);

  const { name, product, description } = formData;

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

  const submitTicket = (e) => {
    e.preventDefault();

    if (formData.product === "" || formData.description === "") {
      toast.error("Please fill the required fields");
    } else {
      dispatch(createTicket(formData))
        .unwrap()
        .then((ticket) => {
          toast.success("Ticket created succesfully");
          navigate("/tickets");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  if (productIsLoading || ticketIsLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url={"/"} />
      <section className="heading">
        <h1>Create New ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <form onSubmit={submitTicket}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              defaultValue={"default"}
              onChange={selectOnChange}
            >
              <option value="default" disabled>
                Select a Product
              </option>
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
