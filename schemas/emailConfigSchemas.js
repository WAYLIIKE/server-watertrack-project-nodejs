export const verificationEmailConfigSchema = ({
  MAIL_SERVICE_USER,
  email,
  BASE_URL,
  identifier,
}) => {
  return {
    from: MAIL_SERVICE_USER,
    to: email,
    subject: 'Email verification',
    text: `Veirify your emai. ${BASE_URL}api/users/verify/${identifier}`,
    html: `<table
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border-collapse: collapse;
      "
    >
      <tr>
        <td align="center" style="padding: 0 20px">
          <h2
            style="
              font-family: Arial, sans-serif;
              font-size: 28px;
              color: #323f47;
              margin-bottom: 48px;
            "
          >
            Verify your email
          </h2>
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin-bottom: 32px;
            "
          >
            Use the link below to verify your email and start enjoying the
            AquaTrack App!
          </p>
          <a
            href="${BASE_URL}api/users/verify/${identifier}"
            style="
              display: inline-block;
              background-color: #9be1a0;
              color: #323f47;
              border-radius: 30px;
              padding: 16px 32px;
              font-family: Arial, sans-serif;
              text-decoration: none;
              font-weight: 700;
              margin-bottom: 32px;
            "
            >Verify email</a
          >
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin: 0;
              margin-bottom: 48px;
            "
          >
            If you did not sign up for this account, please ignore this email.
          </p>
        </td>
      </tr>
    </table>
`,
  };
};

export const forgotPasswordEmailConfigSchema = ({
  MAIL_SERVICE_USER,
  email,
  BASE_URL,
  identifier,
}) => {
  return {
    from: MAIL_SERVICE_USER,
    to: email,
    subject: 'Password reset',
    text: `Reset your password. https://wayliike.github.io/watertrack-project-nodejs-react/reset/${identifier}`,
    html: `<table
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border-collapse: collapse;
      "
    >
      <tr>
        <td align="center" style="padding: 0 20px">
          <h2
            style="
              font-family: Arial, sans-serif;
              font-size: 28px;
              color: #323f47;
              margin-bottom: 48px;
            "
          >
            Do you want to reset your password?
          </h2>
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin: 0;
              margin-bottom: 8px;
            "
          >
            Someone has requested to change your AquaTrack password.
          </p>
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin: 0;
              margin-bottom: 32px;
            "
          >
            Use the button below to reset.
          </p>
          <a
            href="https://wayliike.github.io/watertrack-project-nodejs-react/reset/${identifier}"
            style="
              display: inline-block;
              background-color: #9be1a0;
              color: #323f47;
              border-radius: 30px;
              padding: 16px 32px;
              font-family: Arial, sans-serif;
              text-decoration: none;
              font-weight: 700;
              margin-bottom: 32px;
            "
            >Reset password</a
          >
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin: 0;
              margin-bottom: 48px;
            "
          >
            If you don\`t want reset your password, please ignore this email.
          </p>
        </td>
      </tr>
    </table>`,
  };
};
