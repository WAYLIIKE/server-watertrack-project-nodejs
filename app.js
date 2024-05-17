import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import { waterRouter } from './routes/waterRouter.js';
import { usersRouter } from './routes/usersRouter.js';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use('/api/water', waterRouter);
app.use('/api/users', usersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message: message, stack: err.stack });
});

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000');
});
