import asyncHandler from 'express-async-handler';
import { createWaterSchema } from '../schemas/waterSchemas.js';
import { Water } from '../models/waterModel.js';
import { HttpError } from '../helpers/HttpError.js';

export const createWater = asyncHandler(async (req, res, next) => {
  const water = await Water.create(req.body);

  res.status(200).json(water);
});
