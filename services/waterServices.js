import { Water } from '../models/waterModel.js';

export const addWaterService = ({ date, amount }, owner) =>
  Water.create({ date, amount, owner: owner._id });

export const updateWaterService = (data, body) =>
  Water.findOneAndUpdate(data, body, { new: true });

export const deleteWaterService = data => Water.findOneAndDelete(data);
