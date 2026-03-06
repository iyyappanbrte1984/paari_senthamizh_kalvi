import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';

    if (file.fieldname === 'video') {
      uploadPath += 'videos/';
    } else if (file.fieldname === 'material') {
      uploadPath += 'materials/';
    } else {
      uploadPath += 'misc/';
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    video: /mp4|avi|mov|wmv|flv|webm|mkv/,
    material: /pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip|rar/,
    image: /jpeg|jpg|png|gif|webp/
  };

  const fieldName = file.fieldname;
  const extname = allowedTypes[fieldName]?.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes[fieldName]?.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${fieldName}`));
  }
};

// Upload middleware
export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
}).single('video');

export const uploadMaterial = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}).single('material');

export const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
}).array('files', 10);