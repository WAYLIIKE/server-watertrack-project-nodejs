import express from 'express';

const usersRouter = express.Router();

usersRouter.post('/signup');
usersRouter.post('/signin');
usersRouter.get('/current/refresh');
usersRouter.get('/current');
usersRouter.patch('/current/edit');
usersRouter.post('/signout');

export { usersRouter };
