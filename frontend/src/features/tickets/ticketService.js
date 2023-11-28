import axios from "axios";

const API_URL = "/api/tickets";

// Create new ticket
const create = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// Get user Tickets
const fetchTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single ticket
const fetchTicket = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${ticketID}`, config);
  return response.data[0];
};

const ticketService = {
  create,
  fetchTickets,
  fetchTicket,
};

export default ticketService;
