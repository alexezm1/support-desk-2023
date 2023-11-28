import React, { useEffect } from "react";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reset as resetProducts } from "../features/products/productSlice";
import { reset } from "../features/tickets/ticketSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(resetProducts());
  }, [dispatch]);
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to={"/new-ticket"} className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create new Ticket
      </Link>
      <Link to={"/tickets"} className="btn btn-block">
        <FaTicketAlt /> View my tickets
      </Link>
    </>
  );
}

export default Home;
