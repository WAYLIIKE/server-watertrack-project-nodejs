import Joi from 'joi';

const startDate = new Date('01/01/2024');

export const createWaterSchema = () => {
  const nowDate = new Date();

  return Joi.object({
    date: Joi.number().min(+startDate).max(+nowDate).required(),
    amount: Joi.number().min(10).max(2000).required(),
  });
};

export const updateWaterSchema = () => {
  const nowDate = new Date();

  return Joi.object({
    date: Joi.number().min(+startDate).max(+nowDate),
    amount: Joi.number().min(10).max(2000),
  }).or('date', 'amount');
};
