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
    html: `<h1>Veirify your email</h1>
    <a href="${BASE_URL}api/users/verify/${identifier}">Verify your email</a>`,
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
    text: `Reset your password. ${BASE_URL}api/users/password/reset/${identifier}`,
    html: `<h1>Reset your password</h1>
    <a href="${BASE_URL}api/users/password/reset/${identifier}">Reset your password</a>`,
  };
};
