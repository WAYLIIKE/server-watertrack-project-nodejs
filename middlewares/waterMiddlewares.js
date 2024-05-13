import expressAsyncHandler from 'express-async-handler';
import { Types } from 'mongoose';
import { HttpError } from '../helpers/HttpError.js';

export const checkWaterId = expressAsyncHandler((req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);
  if (!idIsValid) throw new HttpError(404);

  next();
});

export const checkWaterDate = expressAsyncHandler((req, res, next) => {
  const { date } = req.params;
  console.log(date);

  const startDate = 1704067200000;

  const currentDate = new Date();
  const unixCurrentDate = currentDate.getTime();

  if (isNaN(+date) || !Number.isInteger(+date)) throw new HttpError(400);

  if (date < startDate)
    throw new HttpError(400, 'Date must start from 2024/01/01');

  if (date > unixCurrentDate) throw new HttpError(400, 'Date from future');

  next();
});
