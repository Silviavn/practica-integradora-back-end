import ticketModel from "../models/ticket.model";


const generateTicket = async (ticket) => {
  const newTicket = await ticketModel.create(ticket);

  return newTicket;
};

const getTicketFromEmail = async (email) => {
  const ticket = await ticketModel.findOne({ purchaser: email });

  return ticket;
};

export { generateTicket, getTicketFromEmail };