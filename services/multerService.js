import multer from 'multer';
import path from 'path';
import { HttpError } from '../helpers/HttpError.js';

export const multerStorage = multer.diskStorage({
  destination: (req, file, cbk) => {
    cbk(null, path.join('temp'));
  },

  filename: (req, file, cbk) => {
    const extention = file.mimetype.split('/')[1];

    cbk(null, `tempAvatar.${extention}`);
  },
});

export const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith('image/')) {
    cbk(null, true);
  } else {
    cbk(new HttpError(400, 'Please upload images only'), false);
  }
};
