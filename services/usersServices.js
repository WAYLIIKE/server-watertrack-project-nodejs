import { HttpError } from '../helpers/HttpError.js';
import { User } from '../models/userModel.js';
const { GEN_SALT_NUMBER } = process.env;
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import {
  createAccessToken,
  createRefreshToken,
  refreshTokenValidation,
} from './jwtService.js';
import expressAsyncHandler from 'express-async-handler';
import { v4 } from 'uuid';
import { nodemailerService } from './nodemailerService.js';
import { cloudinaryService } from './cloudinaryService.js';

export const signUpUserService = async registerData => {
  const { email, password } = registerData;

  await checkExistsUserService({ email: email });

  registerData.name = email.split('@')[0];
  registerData.password = await hashPassword(password);
  registerData.avatarURL = getGravatar(email);
  registerData.verificationToken = v4();

  await nodemailerService(registerData.verificationToken, email);

  await User.create(registerData);
};

const checkExistsUserService = async filter => {
  const isUserExists = await User.exists(filter);
  if (isUserExists) throw new HttpError(409, 'Provided email already exists');
};

const hashPassword = async data => {
  const salt = await bcrypt.genSalt(+GEN_SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

const getGravatar = email => gravatar.url(email, { d: 'identicon', s: '100' });

export const verifyService = async verificationToken => {
  const user = await User.findOneAndUpdate(
    { verificationToken: verificationToken },
    { verification: true, verificationToken: null },
    { new: true },
  );

  if (!user) throw new HttpError(400, 'User not found');
};

export const resendEmailService = async email => {
  const { verification, verificationToken } = await User.findOne({
    email: email,
  });

  if (verification === true)
    throw new HttpError(400, 'Your email already verificated');

  await nodemailerService(verificationToken, email);
};

export const signInService = async signData => {
  const { email, password } = signData;

  const user = await User.findOne({ email: email });
  if (!user) throw new HttpError(401, 'Email or password is wrong');

  if (user.verification !== true)
    throw new HttpError(401, 'Please, verify your email');

  await checkPasswordService(password, user.password);

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  const finalUser = await User.findByIdAndUpdate(user.id, {
    accessToken,
    refreshToken,
  }).select(
    '-password -accessToken -refreshToken -verification -verificationToken',
  );

  return { finalUser, accessToken, refreshToken };
};

const checkPasswordService = expressAsyncHandler(
  async (checkedPassword, userPassword) => {
    const isValidPassword = await bcrypt.compare(checkedPassword, userPassword);
    if (!isValidPassword) throw new HttpError(400, 'Password is wrong!');
  },
);

export const findUserService = expressAsyncHandler(async (id, accessToken) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new HttpError(401, 'Not authorized');

  if (user.accessToken !== accessToken)
    throw new HttpError(401, 'Not authorized');

  return user;
});

export const editUserService = expressAsyncHandler(
  async (id, userEmail, newUserData, file) => {
    const { email } = newUserData;

    if (userEmail !== email) await checkExistsUserService({ email: email });

    if (file) {
      const newAvatarURL = await cloudinaryService(id, file);
      newUserData.avatarURL = newAvatarURL;
    }

    const newUser = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
    }).select(
      '-password -refreshToken -accessToken -verification -verificationToken',
    );
    return newUser;
  },
);

export const editPasswordService = expressAsyncHandler(
  async (id, oldPass, newPass) => {
    const user = await User.findOne({ _id: id });
    if (!user) throw new HttpError(401, 'Not authorized!');

    await checkPasswordService(oldPass, user.password);

    user.password = await hashPassword(newPass);
    await user.save();
  },
);

export const refreshService = async refreshData => {
  const { refreshToken: token } = refreshData;

  const user = await User.findOne({ refreshToken: token });

  if (!user) {
    throw new HttpError(401, 'Not authorized');
  }

  const id = refreshTokenValidation(token);
  const isExist = User.findOne({ token });

  if (!isExist) throw new HttpError(401, 'Not authorized');

  const accessToken = createAccessToken(id);
  const refreshToken = createRefreshToken(id);

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });
  return { accessToken, refreshToken };
};

export const signoutService = async id => {
  await User.findByIdAndUpdate(id, { accessToken: '', refreshToken: '' });
};

export const countServices = async () => {
  return await User.countDocuments();
};
