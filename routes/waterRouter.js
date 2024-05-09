import express from 'express';
import { createWater } from '../controllers/waterController.js';
import { joiValidateDataMiddleware } from '../middlewares/joiValidatorMiddleware.js';
import { createWaterSchema } from '../schemas/waterSchemas.js';
import { protection } from '../middlewares/usersMiddlewares.js';

const waterRouter = express.Router();

waterRouter.post(
  '/add',
  protection,
  joiValidateDataMiddleware(createWaterSchema),
  createWater,
);
waterRouter.patch('/edit/:id');
waterRouter.delete('/remove/:id');
waterRouter.get('/day/:date');
waterRouter.get('/month/:date');

export { waterRouter };
