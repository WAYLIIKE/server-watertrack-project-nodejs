import expressAsyncHandler from 'express-async-handler';
import {
  editUserService,
  refreshService,
  signInService,
  signUpUserService,
  signoutService,
} from '../services/usersServices.js';

export const signUp = expressAsyncHandler(async (req, res) => {
  await signUpUserService(req.body);

  res.status(201).json({
    message: 'Created',
  });
});

export const signIn = expressAsyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await signInService(req.body);
  res.status(200).json({
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
  const { user, body } = req;
  const newUser = await editUserService(user.id, user.email, body);
  res.status(200).json({
    user: newUser,
  });
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

  res.status(200).json({ message: 'Successful signout.' });
});