import multer from 'multer';
import { HttpError } from '../helpers/HttpError.js';

export const multerStorage = multer.memoryStorage();

export const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith('image/')) {
    cbk(null, true);
  } else {
    cbk(new HttpError(400, 'Please upload images only'), false);
  }
};

export const upload = multer();
