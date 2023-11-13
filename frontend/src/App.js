import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
