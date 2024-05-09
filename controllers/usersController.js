import expressAsyncHandler from 'express-async-handler';
import {
  refreshService,
  signInService,
  signUpUserService,
} from '../services/usersServices.js';
import {
  createAccessToken,
  createRefreshToken,
  refreshTokenValidation,
} from '../services/jwtService.js';

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

export const current = (req, res) => {
  res.status(200).json({ user: req.user });
};

export const refresh = expressAsyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await refreshService(req.body);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
});
