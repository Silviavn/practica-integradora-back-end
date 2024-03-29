import * as ticketDao from "./dao/mongo/ticket.dao.js";

const generateTicket = async (data) => {
  const ticket = {
    ...data,
    code: Math.random().toString(36).substring(2, 9),
    purchaseDateTime: new Date(),
  };
  const newTicket = await ticketDao.generateTicket(ticket);

  return newTicket;
};

const getTicketFromEmail = async (email) => {
  const ticket = await ticketDao.getTicketFromEmail(email);

  return ticket;
};

export { 
  generateTicket, 
  getTicketFromEmail 
};