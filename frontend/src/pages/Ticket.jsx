import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";
import {
  createNotes,
  getNotes,
  reset as resetNotes,
} from "../features/notes/noteSlice";
import { closeTicket, getTicket } from "../features/tickets/ticketSlice";

const modalCustomStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

ReactModal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, ticketIsLoading } = useSelector((state) => state.ticket);
  const { notes, noteIsLoading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const { ticketID } = useParams();
  const navigate = useNavigate();

  const { id, product, description, status, timestamp, updatedat } = ticket;

  useEffect(() => {
    setModalIsOpen(false);
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addNote = (e) => {
    e.preventDefault();

    const noteData = {
      ticketID,
      note_text: noteText,
    };
    dispatch(createNotes(noteData));
    setNoteText("");
    closeModal();
  };

  if (ticketIsLoading || noteIsLoading) {
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
          {notes.length > 0 && <h2>Notes</h2>}
        </header>

        {status !== "Closed" && (
          <button onClick={openModal} className="btn">
            <FaPlus /> Add Note
          </button>
        )}

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalCustomStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button onClick={closeModal} className="btn-close">
            X
          </button>
          <form onSubmit={addNote}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </ReactModal>

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
