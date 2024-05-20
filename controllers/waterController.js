import asyncHandler from 'express-async-handler';
import { Water } from '../models/waterModel.js';
import {
  addWaterService,
  deleteWaterService,
  getSummaryTodayWater,
  updateWaterService,
} from '../services/waterServices.js';
import { HttpError } from '../helpers/HttpError.js';
import { endOfMonth, startOfMonth } from 'date-fns';
import expressAsyncHandler from 'express-async-handler';

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

export const getDayWater = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;

  const date = new Date(+req.params.date);

  const userTimezoneOffset = req.user.timezoneOffset || 0;

  const startOfDay = new Date(date);
  startOfDay.setHours(0 - userTimezoneOffset / 60, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23 - userTimezoneOffset / 60, 59, 59, 999);

  const utcStart = startOfDay.getTime();
  const utcEnd = endOfDay.getTime();

  const foundWaterDayData = await Water.find({
    owner,
    date: {
      $gte: utcStart,
      $lt: utcEnd,
    },
  });

  if (!foundWaterDayData) {
    throw HttpError(404, `Info for this day not found`);
  }

  const totalDayWater = foundWaterDayData.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  res.status(200).json({
    date,
    totalDayWater,
    consumedWaterData: foundWaterDayData,
    owner,
  });
});

export const getMonthWater = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const date = new Date(+req.params.date); // Припустимо, що date у форматі Unix timestamp

  const userTimezoneOffset = req.user.timezoneOffset || 0;

  const startOfMonthDate = startOfMonth(date);
  const endOfMonthDate = endOfMonth(date);

  const startOfDay = new Date(startOfMonthDate);
  startOfDay.setHours(0 - userTimezoneOffset / 60, 0, 0, 0);

  const endOfDay = new Date(endOfMonthDate);
  endOfDay.setHours(23 - userTimezoneOffset / 60, 59, 59, 999);

  const utcStart = startOfDay.getTime();
  const utcEnd = endOfDay.getTime();

  const foundWaterMonthData = await Water.find({
    owner,
    date: {
      $gte: utcStart,
      $lt: utcEnd,
    },
  });

  const aggregatedData = foundWaterMonthData.reduce((acc, item) => {
    const date = new Date(item.date);
    const day = date.getDate();

    if (!acc[day]) {
      acc[day] = {
        date: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
        totalDayWater: 0,
      };
    }
    acc[day].totalDayWater += item.amount;

    return acc;
  }, {});

  const result = Object.values(aggregatedData);

  res.status(200).json(result);
});

export const summaryTodayWater = expressAsyncHandler(async (req, res) => {
  const todaySumamryWater = await getSummaryTodayWater();
  res.status(200).json({ todaySumamryWater });
});
