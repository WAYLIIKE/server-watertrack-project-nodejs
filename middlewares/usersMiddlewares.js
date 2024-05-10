import expressAsyncHandler from 'express-async-handler';
import { HttpError } from '../helpers/HttpError.js';
import { tokenValidation } from '../services/jwtService.js';
import { findUserService } from '../services/usersServices.js';

export const protection = expressAsyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new HttpError(401, 'Not authorized');

  const token = authorization.split(' ')[1];
  const id = tokenValidation(token);

  if (!id) throw new HttpError(401, 'Not authorized');

  const user = await findUserService(id, accessToken);

  req.user = user;
  next();
});
