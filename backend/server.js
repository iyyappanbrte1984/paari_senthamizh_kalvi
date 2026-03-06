import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import logger from './utils/logger.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import testRoutes from './routes/testRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);

// Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API documentation
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Paari Senthamizh Kalvi API',
    version: '1.0.0',
    description: 'API for Tamil education platform',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password',
        getProfile: 'GET /api/auth/profile',
        updateProfile: 'PUT /api/auth/profile'
      },
      courses: {
        getCourses: 'GET /api/courses',
        createCourse: 'POST /api/courses',
        getCourse: 'GET /api/courses/:id',
        updateCourse: 'PUT /api/courses/:id',
        deleteCourse: 'DELETE /api/courses/:id'
      },
      videos: {
        getVideos: 'GET /api/videos',
        createVideo: 'POST /api/videos',
        getVideo: 'GET /api/videos/:id',
        updateVideo: 'PUT /api/videos/:id',
        deleteVideo: 'DELETE /api/videos/:id'
      },
      materials: {
        getMaterials: 'GET /api/materials',
        createMaterial: 'POST /api/materials',
        getMaterial: 'GET /api/materials/:id',
        updateMaterial: 'PUT /api/materials/:id',
        deleteMaterial: 'DELETE /api/materials/:id'
      },
      tests: {
        getTests: 'GET /api/tests',
        createTest: 'POST /api/tests',
        getTest: 'GET /api/tests/:id',
        updateTest: 'PUT /api/tests/:id',
        deleteTest: 'DELETE /api/tests/:id'
      },
      admin: {
        getUsers: 'GET /api/admin/users',
        getStats: 'GET /api/admin/stats'
      }
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

export default app;
