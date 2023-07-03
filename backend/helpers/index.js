const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

exports.kirimEmail = (dataEmail) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      secure: true,
      requireTLS: true,
      auth: {
        user: "ketutkeren123@gmail.com",
        pass: "mcycjlestscniiai",
      },
    })
  );
  return transporter
    .sendMail(dataEmail)
    .then((info) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
