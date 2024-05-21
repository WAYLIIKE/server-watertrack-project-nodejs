import expressAsyncHandler from 'express-async-handler';
import {
  countServices,
  editPasswordService,
  editUserService,
  forgotPasswordService,
  refreshService,
  resendEmailService,
  resetPasswordService,
  signInService,
  signUpUserService,
  signoutService,
  verifyService,
} from '../services/usersServices.js';

export const signUp = expressAsyncHandler(async (req, res) => {
  await signUpUserService(req.body);

  res.status(201).json({
    message: 'Verification link has been sent to your email',
  });
});

export const verification = expressAsyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  await verifyService(verificationToken);
  res.status(200).json({ message: 'Verification sucsessfull' });
});

export const resendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  await resendEmailService(email);

  res
    .status(200)
    .json({ message: 'Verification link has been resent to your email' });
});

export const signIn = expressAsyncHandler(async (req, res) => {
  const { finalUser, accessToken, refreshToken } = await signInService(
    req.body,
  );

  res.status(200).json({
    user: finalUser,
    accessToken,
    refreshToken,
  });
});

export const currentUser = (req, res) => {
  const user = req.user;

  user.accessToken = undefined;
  user.refreshToken = undefined;

  res.status(200).json({ user });
};

export const editUser = expressAsyncHandler(async (req, res) => {
  const { user, body, file } = req;
  const newUser = await editUserService(user.id, user.email, body, file);
  res.status(200).json({
    user: newUser,
  });
});

export const editPassword = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPass, newPass } = req.body;

  await editPasswordService(id, oldPass, newPass);
  res.status(200).json({ message: 'Sucsess' });
});

export const refresh = expressAsyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await refreshService(req.body);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
});

export const signOut = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  await signoutService(_id);

  res.status(200).json({ message: 'Successful signout' });
});

export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  await forgotPasswordService(email);
  res.status(200).json({
    message:
      'A message with a link to reset your password has been sent to your email',
  });
});

export const resetPasswordPage = (req, res) =>
  res.status(200).json({ message: 'You can reset your password' });

export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { newPass } = req.body;
  const { resetPasswordToken } = req.params;
  await resetPasswordService(resetPasswordToken, newPass);

  res.status(200).json({ message: 'Your password has been reset' });
});

export const countUser = expressAsyncHandler(async (req, res) => {
  const count = await countServices();
  res.status(200).json({
    count,
  });
});

