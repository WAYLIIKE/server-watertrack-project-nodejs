import express from 'express';
import { joiValidateDataMiddleware } from '../middlewares/joiValidatorMiddleware.js';
import { refreshJoiSchema, signUpJoiSchema } from '../schemas/usersSchemas.js';
import {
  current,
  signIn,
  signUp,
  refresh,
} from '../controllers/usersController.js';
import { protection } from '../middlewares/usersMiddlewares.js';

const usersRouter = express.Router();

usersRouter.post('/signup', joiValidateDataMiddleware(signUpJoiSchema), signUp);
usersRouter.post('/signin', signIn);

usersRouter.post(
  '/refresh',
  joiValidateDataMiddleware(refreshJoiSchema),
  refresh
);

usersRouter.get('/current', protection, current);
usersRouter.patch('/current/edit');
usersRouter.get('/current/refresh');
usersRouter.post('/signout');

export { usersRouter };
