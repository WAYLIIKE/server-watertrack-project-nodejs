import Joi from 'joi';

export const createWaterSchema = Joi.object()
  .options({})
  .keys({
    date: Joi.date().required(),
    amount: Joi.number().min(10).max(2000).required(),
  });

export const updateWaterSchema = Joi.object()
  .options({})
  .keys({
    date: Joi.date(),
    amount: Joi.number().min(10).max(2000).required(),
  });
