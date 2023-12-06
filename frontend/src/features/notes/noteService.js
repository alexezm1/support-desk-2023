import axios from "axios";

const API_URL = "/api/tickets/";

const fetchNotes = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/${ticketID}/notes`, config);

  return response.data.notes;
};

const createNote = async (noteData, token) => {
  const { ticketID } = noteData;
  delete noteData.ticketID;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `/${ticketID}/notes`,
    noteData,
    config
  );

  return response.data.note;
};

const noteService = {
  fetchNotes,
  createNote,
};

export default noteService;
