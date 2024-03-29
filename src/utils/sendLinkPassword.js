import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "savergara@gmail.com",
    pass: "ajjmmskklss",
  },
});

const sendLinkResetPassword = async (token, email) => {
  let result = await transporter.sendMail({
    from: "E-commerce",
    to: email,
    subject: "Recuperar contraseña",
    // Mandamos el link para resetear el password en el cuerpo del mail
    html: `
      <h1>Recuperar contraseña</h1>
      <p>Para recuperar tu contraseña haz click en el siguiente link</p>
      <a href="http://localhost:8080/changepassword/${token}">Recuperar contraseña</a>
    `,
  });

  return result;
};

export { 
  sendLinkResetPassword 
};