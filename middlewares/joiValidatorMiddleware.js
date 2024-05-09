import { HttpError } from "../helpers/HttpError.js";

export const joiValidateDataMiddleware = (JoiSchema) => {
  return (req, res, next) => {
    const { error } = JoiSchema.validate(req.body);
    if (error)
      throw new HttpError(400, `Joi validator: ${error.details[0].message}`);
    next();
  };
};
