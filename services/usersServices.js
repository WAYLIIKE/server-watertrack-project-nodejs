import { HttpError } from '../helpers/HttpError.js';
import { User } from '../models/userModel.js';
const { GEN_SALT_NUMBER } = process.env;
import bcrypt from 'bcrypt';
import {
  createAccessToken,
  createRefreshToken,
  refreshTokenValidation,
} from './jwtService.js';
import expressAsyncHandler from 'express-async-handler';

export const signUpUserService = async registerData => {
  const { email, password } = registerData;

  if (!email || !password)
    throw new HttpError(
      400,
      'Please provide all required fields (email and password)',
    );

  await checkExistsiUserService({ email: email });

  registerData.name = email.split('@')[0];
  registerData.password = await hashPassword(password);

  await User.create(registerData);
};

const checkExistsiUserService = async filter => {
  const isUserExists = await User.exists(filter);
  if (isUserExists) throw new HttpError(400, 'Email in use');
};

const hashPassword = async data => {
  const salt = await bcrypt.genSalt(+GEN_SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

export const signInService = async signData => {
  const { email, password } = signData;

  const user = await User.findOne({ email: email });
  if (!user) throw new HttpError(401, 'Email or password is wrong');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new HttpError(401, 'Email or password is wrong');

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  await User.findByIdAndUpdate(user.id, { accessToken, refreshToken });

  return { accessToken, refreshToken };
};

export const findUserService = expressAsyncHandler(async (id, accessToken) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new HttpError(401, 'Not authorized');

  if (user.accessToken !== accessToken)
    throw new HttpError(401, 'Not authorized');

  return user;
});

export const editUserService = expressAsyncHandler(
  async (id, userEmail, newUserData) => {
    const { email, name, gender, weight, activityTime, desiredVolume } =
      newUserData;

    if (userEmail !== email) await checkExistsiUserService({ email: email });

    const newUser = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
    }).select('-password -refreshToken -accessToken');
    return newUser;
  },
);

export const refreshService = async refreshData => {
  const { refreshToken: token } = refreshData;

  const user = await User.findOne({ refreshToken: token });

  if (!user) {
    throw new HttpError(403, 'Token invalid'); //!!
  }

  const id = refreshTokenValidation(token);
  const isExist = User.findOne({ token });

  if (!isExist) throw new HttpError(403, 'Token invalid'); //!!

  const accessToken = createAccessToken(id);
  const refreshToken = createRefreshToken(id);

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });
  return { accessToken, refreshToken };
};

export const signoutService = async id => {
  await User.findByIdAndUpdate(id, { accessToken: '', refreshToken: '' });
};
