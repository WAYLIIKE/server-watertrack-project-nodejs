const {
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
} = process.env;
import nodemailer from 'nodemailer';

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
      from: `aquatrack@ukr.net`,
      to: email,
      subject: 'Email verification',
      text: `Veirify your emai. http://localhost:3000/api/users/verify/${verificationToken}`, //! DEV ONLY
      html: `<h1>Veirify your email</h1>
    <a href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email</a>`,
    };

    await emailTransporter.sendMail(emailConfig);
    return true;
  } catch (error) {
    return false;
  }
};
