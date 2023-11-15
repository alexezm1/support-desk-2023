import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerData } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const registerUser = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(registerData(userData))
      .unwrap()
      .then((user) => {
        toast.success(`New account created! (${user.body.user.email})`);
        navigate("/");
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={registerUser}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
            />
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

export default Register;
