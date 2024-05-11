import expressAsyncHandler from 'express-async-handler';
import { Types } from 'mongoose';
import { HttpError } from '../helpers/HttpError.js';

export const checkWaterId = expressAsyncHandler((req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);
  if (!idIsValid) throw new HttpError(404);

  next();
});
