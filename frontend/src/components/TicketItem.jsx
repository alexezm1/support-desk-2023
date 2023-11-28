import React from "react";
import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.timestamp).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link className="btn btn-reverse btn-sm" to={`/ticket/${ticket.id}`}>
        View
      </Link>
    </div>
  );
}

export default TicketItem;
