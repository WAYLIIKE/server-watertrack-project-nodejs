import asyncHandler from 'express-async-handler';
import { Water } from '../models/waterModel.js';
import { updateWaterServices } from '../services/waterServices.js';

export const createWater = asyncHandler(async (req, res, next) => {
  const water = await Water.create(req.body);

  res.status(200).json(water);
});

export const updateWater = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await updateWaterServices({ _id: id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }
  res.status(200).json(result);
});
