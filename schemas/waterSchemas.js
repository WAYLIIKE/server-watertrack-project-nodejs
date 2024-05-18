import Joi from 'joi';

const startDate = new Date('01/01/2024');

export const createWaterSchema = () => {
  return Joi.object({
    date: Joi.number().min(+startDate).max(Date.now()).required(),
    amount: Joi.number().min(10).max(2000).required(),
  });
};

export const updateWaterSchema = () => {
  return Joi.object({
    date: Joi.number().min(+startDate).max(Date.now()),
    amount: Joi.number().min(10).max(2000),
  }).or('date', 'amount');
};
