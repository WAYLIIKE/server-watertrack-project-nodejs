import express from 'express';

const waterRouter = express.Router();

waterRouter.post('/add');
waterRouter.patch('/edit/:id');
waterRouter.delete('/remove/:id');
waterRouter.get('/day/:date');
waterRouter.get('/month/:date');

export { waterRouter };
