import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});

 const sendEmail = async ({ to, subject, text, html }:any) => {
  try {
    await transporter.sendMail({
      from: `"DESI ELEGANCE" <m.iqbal29.work@gmail.com>`,
      to,
      subject,
      text,
      html,
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default sendEmail;