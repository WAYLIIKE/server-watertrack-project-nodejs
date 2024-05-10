import { Water } from '../models/waterModel.js';

export const updateWaterServices = (data, body) =>
  Water.findOneAndUpdate(data, body, { new: true });
