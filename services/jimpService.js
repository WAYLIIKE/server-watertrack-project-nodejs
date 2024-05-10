import Jimp from 'jimp';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import expressAsyncHandler from 'express-async-handler';

export const jimpService = expressAsyncHandler(async (id, avatarURL) => {
  const extention = avatarURL.split('.')[1];

  const fileName = `${id}-${v4()}.${extention}`;
  const filePath = path.join(process.cwd(), 'public', 'avatars');

  Jimp.read(avatarURL, (err, avatar) => {
    avatar.resize(100, 100).write(path.join(filePath, fileName));
  });

  // await fs.rm(avatarURL);

  return path.join('avatars', fileName);
});
