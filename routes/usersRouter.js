import express from 'express';
import { joiValidateDataMiddleware } from '../middlewares/joiValidatorMiddleware.js';
import {
  refreshJoiSchema,
  signUpJoiSchema,
  editUserJoiSchema,
  signInJoiSchema,
} from '../schemas/usersSchemas.js';
import {
  currentUser,
  signIn,
  signUp,
  refresh,
  editUser,
  signOut,
  countUser,
} from '../controllers/usersController.js';
import { protection, uploadAvatar } from '../middlewares/usersMiddlewares.js';

const usersRouter = express.Router();

usersRouter.post('/signup', joiValidateDataMiddleware(signUpJoiSchema), signUp);

usersRouter.post('/signin', joiValidateDataMiddleware(signInJoiSchema), signIn);

usersRouter.get('/current', protection, currentUser);

usersRouter.post(
  '/current/refresh',
  joiValidateDataMiddleware(refreshJoiSchema),
  refresh
);

usersRouter.patch(
  '/current/edit',
  protection,
  uploadAvatar,
  joiValidateDataMiddleware(editUserJoiSchema),
  editUser
);

usersRouter.post('/signout', protection, signOut);

usersRouter.get('/count', countUser);

export { usersRouter };
