import asyncHandler from 'express-async-handler';
import { Water } from '../models/waterModel.js';

export const createWater = asyncHandler(async (req, res, next) => {
  const water = await Water.create(req.body);

  res.status(200).json(water);
});
