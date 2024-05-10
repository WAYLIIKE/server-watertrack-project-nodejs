import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { HttpError } from '../helpers/HttpError.js';
const {
  ACCESS_SECRET,
  REFRESH_SECRET,
  JWT_ACC_EXPIRES_IN,
  JWT_REF_EXPIRES_IN,
} = process.env;

export const createAccessToken = (id) =>
  jwt.sign({ id }, ACCESS_SECRET, {
    expiresIn: JWT_ACC_EXPIRES_IN,
  });

export const createRefreshToken = (id) =>
  jwt.sign({ id }, REFRESH_SECRET, {
    expiresIn: JWT_REF_EXPIRES_IN,
  });

export const tokenValidation = (accessToken) => {
  if (!accessToken) throw new HttpError(401, 'Not authorized');

  try {
    const { id } = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    return id;
  } catch (err) {
    throw new HttpError(401, 'Not authorized');
  }
};

export const refreshTokenValidation = (refreshToken) => {
  if (!refreshToken) throw new HttpError(403, error.message); //!

  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    return id;
  } catch (error) {
    throw new HttpError(403, error.message); //!
  }
};
