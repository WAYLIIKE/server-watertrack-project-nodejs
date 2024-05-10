import expressAsyncHandler from 'express-async-handler';
import { HttpError } from '../helpers/HttpError.js';
import { tokenValidation } from '../services/jwtService.js';
import { findUserService } from '../services/usersServices.js';
import multer from 'multer';
import { multerFilter, multerStorage } from '../services/multerService.js';

export const protection = expressAsyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new HttpError(401, 'Not authorized');

  const accessToken = authorization.split(' ')[1];
  const id = tokenValidation(accessToken);

  if (!id) throw new HttpError(401, 'Not authorized');

  const user = await findUserService(id, accessToken);

  req.user = user;
  next();
});

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
}).single('avatar');
