import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { reset as resetProducts } from "../features/products/productSlice";
import { getTickets } from "../features/tickets/ticketSlice";

function MyTickets() {
  const dispatch = useDispatch();
  const { tickets, ticketIsLoading } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(resetProducts());
    dispatch(getTickets())
      .unwrap()
      .catch((error) => toast.error(error));
  }, [dispatch]);

  if (ticketIsLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url={"/"} />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {tickets.map((ticket) => {
          return <TicketItem key={ticket.id} ticket={ticket} />;
        })}
      </div>
    </>
  );
}

export default MyTickets;
