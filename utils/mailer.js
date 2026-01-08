import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL, 
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
});

export const sendEmail = async ({ to, subject, html, headers = {} }) => {
  return transporter.sendMail({
    from: `"Soul Reset – 2026" <${process.env.SMTP_MAIL}>`,
    to,
    subject,
    html,
   headers,
    priority: "high",
  });
};
