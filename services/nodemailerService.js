const {
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
  BASE_URL,
} = process.env;
import nodemailer from 'nodemailer';
import { HttpError } from '../helpers/HttpError.js';

export const nodemailerService = async (
  email,
  identifier,
  emailConfigSchema,
) => {
  const configData = {
    MAIL_SERVICE_USER,
    email,
    BASE_URL,
    identifier,
  };

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

    const emailConfig = emailConfigSchema(configData);

    await emailTransporter.sendMail(emailConfig);
  } catch (error) {
    throw new HttpError(500, error);
  }
};
