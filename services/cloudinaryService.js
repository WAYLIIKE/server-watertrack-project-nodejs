import { v2 as cloudinary } from 'cloudinary';
import { v4 } from 'uuid';
import expressAsyncHandler from 'express-async-handler';
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const cloudinaryService = expressAsyncHandler(async (id, file) => {
  const publicId = `${id}-${v4()}`;
  await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    {
      public_id: publicId,
    },
  );

  const avatarURL = await cloudinary.url(publicId, {
    width: 100,
    height: 100,
    crop: 'fill',
  });

  return avatarURL;
});
