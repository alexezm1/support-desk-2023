import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket } from "../features/tickets/ticketSlice";

function Ticket() {
  const { ticket, ticketIsLoading } = useSelector((state) => state.ticket);
  const dispatch = useDispatch();
  const { ticketID } = useParams();
  const navigate = useNavigate();

  const { id, product, description, status, timestamp, updatedat } = ticket;

  useEffect(() => {
    dispatch(getTicket(ticketID))
      .unwrap()
      .catch((error) => {
        toast.error(error);
        navigate("/tickets");
      });
  }, [dispatch, ticketID, navigate]);

  if (ticketIsLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url={"/tickets"} />
          <h2>
            Ticket ID : {id}
            <span className={`status status-${status}`}>{status}</span>
          </h2>
          <h3>Date Submitted: {new Date(timestamp).toLocaleString("en-US")}</h3>
          {(updatedat !== null || updatedat !== "") && (
            <h3>Date Updated: {new Date(updatedat).toLocaleString("en-US")}</h3>
          )}
          <h3>Product: {product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{description}</p>
          </div>
        </header>
      </div>
    </>
  );
}

export default Ticket;
