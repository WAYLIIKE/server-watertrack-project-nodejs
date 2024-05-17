import { HttpError } from '../helpers/HttpError.js';

export const joiValidateDataMiddleware = JoiSchema => {
  return (req, res, next) => {
    let schema;
    if (typeof JoiSchema === 'function') {
      schema = JoiSchema(); // Викликаємо функцію, якщо JoiSchema є функцією
    } else {
      schema = JoiSchema; // Використовуємо без змін, якщо JoiSchema не є функцією
    }

    const { error } = schema.validate(req.body);
    if (error)
      throw new HttpError(400, `Joi validator: ${error.details[0].message}`);
    next();
  };
};
