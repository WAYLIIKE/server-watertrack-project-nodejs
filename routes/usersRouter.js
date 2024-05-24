import express from 'express';
import { joiValidateDataMiddleware } from '../middlewares/joiValidatorMiddleware.js';
import {
  refreshJoiSchema,
  signUpJoiSchema,
  editUserJoiSchema,
  signInJoiSchema,
  checkEmailJoiSchema,
  editPasswordJoiSchema,
  resetPasswordJoiSchema,
} from '../schemas/usersSchemas.js';
import {
  currentUser,
  signIn,
  signUp,
  refresh,
  editUser,
  signOut,
  countUser,
  verification,
  resendEmail,
  editPassword,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
} from '../controllers/usersController.js';
import {
  protection,
  resetPasswordProtection,
  uploadAvatar,
} from '../middlewares/usersMiddlewares.js';

const usersRouter = express.Router();

usersRouter.post('/signup', joiValidateDataMiddleware(signUpJoiSchema), signUp);

usersRouter.get('/verify/:verificationToken', verification);

usersRouter.post(
  '/verify',
  joiValidateDataMiddleware(checkEmailJoiSchema),
  resendEmail,
);

usersRouter.post(
  '/password/forgot',
  joiValidateDataMiddleware(checkEmailJoiSchema),
  forgotPassword,
);

usersRouter.get(
  '/password/reset/:resetPasswordToken',
  resetPasswordProtection,
  resetPasswordPage,
);

usersRouter.patch(
  '/password/reset/:resetPasswordToken',
  resetPasswordProtection,
  joiValidateDataMiddleware(resetPasswordJoiSchema),
  resetPassword,
);

usersRouter.post('/signin', joiValidateDataMiddleware(signInJoiSchema), signIn);

usersRouter.get('/current', protection, currentUser);

usersRouter.post(
  '/current/refresh',
  joiValidateDataMiddleware(refreshJoiSchema),
  refresh,
);

usersRouter.patch(
  '/current/edit',
  protection,
  uploadAvatar,
  joiValidateDataMiddleware(editUserJoiSchema),
  editUser,
);

usersRouter.patch(
  '/current/edit/password/:id',
  protection,
  joiValidateDataMiddleware(editPasswordJoiSchema),
  editPassword,
);

usersRouter.post('/signout', protection, signOut);

usersRouter.get('/count', countUser);

export { usersRouter };
