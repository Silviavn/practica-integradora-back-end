import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "savergara@gmail.com",
    pass: "ajjmmskklss",
  },
});

const sendTicketMail = async (ticket) => {
  let result = await transporter.sendMail({
    from: "E-commerce",
    to: ticket.purchacer,
    subject: `Ticket de compra ${ticket.code}`,
    // Mandamos los datos del ticket en el cuerpo del mail
    html: `
      <h1>Ticket de compra</h1>
      <p>Gracias por tu compra</p>
      <p>Este es tu ticket de compra</p>
      <p>Código: ${ticket.code}</p>
      <p>Fecha: ${ticket.purchaseDateTime}</p>
      <p>Total: ${ticket.amount}</p>
    `,
  });

  return result;
};

export { sendTicketMail };