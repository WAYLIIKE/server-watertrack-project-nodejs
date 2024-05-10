import { Water } from '../models/waterModel.js';

export const addWater = ({ date, amount }, owner) =>
  Water.create({ date, amount, owner: owner._id });

export const updateWaterServices = (data, body) =>
  Water.findOneAndUpdate(data, body, { new: true });
