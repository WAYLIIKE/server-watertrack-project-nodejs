import Joi from 'joi';

const startDate = new Date('01/01/2024');

const unixDay = 86400000;

export const createWaterSchema = () => {
  return Joi.object({
    date: Joi.number()
      .min(+startDate)
      .max(Date.now() + unixDay)
      .required(),
    amount: Joi.number().min(10).max(2000).required(),
  });
};

export const updateWaterSchema = () => {
  return Joi.object({
    date: Joi.number()
      .min(+startDate)
      .max(Date.now() + unixDay),
    amount: Joi.number().min(10).max(2000),
  }).or('date', 'amount');
};
