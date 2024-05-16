import express from 'express';
import {
  createWater,
  deleteWater,
  getDayWater,
  getMonthWater,
  updateWater,
} from '../controllers/waterController.js';
import { joiValidateDataMiddleware } from '../middlewares/joiValidatorMiddleware.js';
import {
  createWaterSchema,
  updateWaterSchema,
} from '../schemas/waterSchemas.js';
import { protection } from '../middlewares/usersMiddlewares.js';
import {
  checkWaterDate,
  checkWaterId,
} from '../middlewares/waterMiddlewares.js';

const waterRouter = express.Router();

waterRouter.post(
  '/add',
  protection,
  joiValidateDataMiddleware(createWaterSchema),
  createWater,
);

waterRouter.put(
  '/edit/:id',
  protection,
  checkWaterId,
  joiValidateDataMiddleware(updateWaterSchema),
  updateWater,
);

waterRouter.delete('/remove/:id', protection, checkWaterId, deleteWater);

waterRouter.get('/day/:date', protection, checkWaterDate, getDayWater);

waterRouter.get('/month/:date', protection, checkWaterDate, getMonthWater);

export { waterRouter };
