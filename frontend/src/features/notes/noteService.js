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

const noteService = {
  fetchNotes,
};

export default noteService;
