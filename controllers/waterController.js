import asyncHandler from 'express-async-handler';
import { Water } from '../models/waterModel.js';
import {
  addWaterService,
  deleteWaterService,
  updateWaterService,
} from '../services/waterServices.js';
import { HttpError } from '../helpers/HttpError.js';

export const createWater = asyncHandler(async (req, res, next) => {
  // const water = await Water.create(req.body);
  const water = await addWaterService(req.body, req.user);
  res.status(200).json(water);
});

export const updateWater = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await updateWaterService({ _id: id, owner }, req.body);

  if (!result) throw new HttpError(404);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }

  res.status(200).json(result);
});

export const deleteWater = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await deleteWaterService({ _id: id, owner });

  if (!result) throw new HttpError(404);

  res.status(200).json(result);
});
