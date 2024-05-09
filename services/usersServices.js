import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
const { GEN_SALT_NUMBER } = process.env;
import bcrypt from "bcrypt";
import { createToken } from "./jwtService.js";
import expressAsyncHandler from "express-async-handler";

export const signUpUserService = async (registerData) => {
  const { email, password } = registerData;

  if (!email || !password)
    throw new HttpError(
      400,
      "Please provide all required fields (email and password)"
    );

  const isUserExists = await checkExistsiUserService({ email: email });
  if (isUserExists) throw new HttpError(400, "Email in use");

  registerData.name = email.split("@")[0];
  registerData.password = await hashPassword(password);

  await User.create(registerData);
};

const checkExistsiUserService = async (filter) => await User.exists(filter);

const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+GEN_SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

export const signInService = async (signData) => {
  const { email, password } = signData;

  const user = await User.findOne({ email: email });
  if (!user) throw new HttpError(401, "Email or password is wrong");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new HttpError(401, "Email or password is wrong");

  const token = createToken(user.id);

  await User.findByIdAndUpdate(user.id, { token: token });

  return token;
};

export const findUserService = expressAsyncHandler(async (id, token) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new HttpError(401, "Not authorized");

  if (user.token !== token) throw new HttpError(401, "Not authorized");
  user.token = undefined;
  return user;
});
