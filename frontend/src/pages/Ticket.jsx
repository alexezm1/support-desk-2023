import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";
import { getNotes, reset as resetNotes } from "../features/notes/noteSlice";
import { closeTicket, getTicket } from "../features/tickets/ticketSlice";

function Ticket() {
  const { ticket, ticketIsLoading } = useSelector((state) => state.ticket);
  const { notes, noteIsLoading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const { ticketID } = useParams();
  const navigate = useNavigate();

  const { id, product, description, status, timestamp, updatedat } = ticket;

  useEffect(() => {
    dispatch(resetNotes());
    dispatch(getTicket(ticketID))
      .unwrap()
      .catch((error) => {
        toast.error(error);
        navigate("/tickets");
      });
    dispatch(getNotes(ticketID));
  }, [dispatch, ticketID, navigate]);

  const onTicketClose = () => {
    const updatedTicketData = {
      product,
      description,
      newStatus: "Closed",
      ticketID,
    };
    dispatch(closeTicket(updatedTicketData))
      .unwrap()
      .then(() => {
        toast.success("Ticket closed");
        navigate("/tickets");
      })
      .catch((error) => toast.error(error));
  };

  if (ticketIsLoading || noteIsLoading) {
    return <Spinner />;
  }

  console.log(notes);
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
          {notes.length > 0 && <h2>Notes</h2>}
        </header>

        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}

        {status !== "Closed" && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
}

export default Ticket;
