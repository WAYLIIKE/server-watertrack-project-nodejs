import jwt from "jsonwebtoken";
import "dotenv/config";
import { HttpError } from "../helpers/HttpError.js";
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const createToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

export const tokenValidation = (token) => {
  if (!token) throw new HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (err) {
    throw new HttpError(401, "Not authorized");
  }
};
