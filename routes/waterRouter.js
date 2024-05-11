import express from 'express';
import { createWater, updateWater } from '../controllers/waterController.js';
import { joiValidateDataMiddleware } from '../middlewares/joiValidatorMiddleware.js';
import {
  createWaterSchema,
  updateWaterSchema,
} from '../schemas/waterSchemas.js';
import { protection } from '../middlewares/usersMiddlewares.js';

const waterRouter = express.Router();

waterRouter.post('/add');

waterRouter.post(
  '/add',
  protection,
  joiValidateDataMiddleware(createWaterSchema),
  createWater
);

waterRouter.put(
  '/edit/:id',
  protection,
  joiValidateDataMiddleware(updateWaterSchema),
  updateWater
);

waterRouter.delete('/remove/:id');

waterRouter.get('/day/:date');

export { waterRouter };
