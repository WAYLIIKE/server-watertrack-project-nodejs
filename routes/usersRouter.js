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
} from '../controllers/usersController.js';
import { protection } from '../middlewares/usersMiddlewares.js';

const usersRouter = express.Router();

usersRouter.post('/signup', joiValidateDataMiddleware(signUpJoiSchema), signUp);

usersRouter.post('/signin', joiValidateDataMiddleware(signInJoiSchema), signIn);

usersRouter.post(
  '/refresh',
  joiValidateDataMiddleware(refreshJoiSchema),
  refresh,
);

usersRouter.get('/current', protection, currentUser);

usersRouter.patch(
  '/current/edit',
  protection,
  joiValidateDataMiddleware(editUserJoiSchema),
  editUser,
);

usersRouter.get('/current/refresh');

usersRouter.post('/signout');

export { usersRouter };
