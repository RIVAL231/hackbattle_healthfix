// utils/multerConfig.js
import multer from 'multer';
import nextConnect from 'next-connect';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = nanoid();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadMiddleware = nextConnect().use(upload.single('file'));

export default uploadMiddleware;
