import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyTickets from "./pages/MyTickets";
import NewTicket from "./pages/NewTicket";
import Register from "./pages/Register";
import Ticket from "./pages/Ticket";

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
            <Route
              path="/new-ticket"
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <PrivateRoute>
                  <MyTickets />
                </PrivateRoute>
              }
            />
            <Route
              path="/ticket/:ticketID"
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              }
            />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
