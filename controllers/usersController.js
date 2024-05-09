import expressAsyncHandler from "express-async-handler";
import { signInService, signUpUserService } from "../services/usersServices.js";

export const signUp = expressAsyncHandler(async (req, res) => {
  await signUpUserService(req.body);

  res.status(201).json({
    message: "Created",
  });
});

export const signIn = expressAsyncHandler(async (req, res) => {
  const token = await signInService(req.body);
  res.status(200).json({
    token,
  });
});

export const current = (req, res) => {
  res.status(200).json({ user: req.user });
};
