const {
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
} = process.env;
import nodemailer from 'nodemailer';
import { HttpError } from '../helpers/HttpError.js';

export const nodemailerService = async (verificationToken, email) => {
  try {
    const emailTransporter = nodemailer.createTransport({
      host: MAIL_SERVICE_HOST,
      port: +MAIL_SERVICE_PORT,
      secure: true,
      auth: {
        user: MAIL_SERVICE_USER,
        pass: MAIL_SERVICE_PASS,
      },
    });

    const emailConfig = {
      from: MAIL_SERVICE_USER,
      to: email,
      subject: 'Email verification',
      text: `Veirify your emai. https://server-watertrack-project-nodejs.onrender.com/api/users/verify/${verificationToken}`, //! DEV ONLY
      html: `<h1>Veirify your email</h1>
    <a href="https://server-watertrack-project-nodejs.onrender.com/api/users/verify/${verificationToken}">Verify your email</a>`,
    };

    await emailTransporter.sendMail(emailConfig);
  } catch (error) {
    throw new HttpError(500, error);
  }
};
