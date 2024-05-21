import expressAsyncHandler from 'express-async-handler';
import { Water } from '../models/waterModel.js';

export const addWaterService = ({ date, amount }, owner) =>
  Water.create({ date, amount, owner: owner._id });

export const updateWaterService = (data, body) =>
  Water.findOneAndUpdate(data, body, { new: true });

export const deleteWaterService = (data) => Water.findOneAndDelete(data);

export const getSummaryTodayWater = expressAsyncHandler(async () => {
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59, 999);

  const todayAddedWaterCards = await Water.find({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  let totalDailyWaterAmount = 0;
  for (const card of todayAddedWaterCards) {
    totalDailyWaterAmount += card.amount;
  }

  return totalDailyWaterAmount;
});
