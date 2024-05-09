import Joi from 'joi';

export const createWaterSchema = Joi.object()
  .options({})
  .keys({
    date: Joi.date().required(),
    amount: Joi.number().min(0.1).max(5000).required(),
  });
