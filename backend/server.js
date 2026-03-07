import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { apiLimiter, authLimiter } from './middleware/rateLimit.js';
import logger from './utils/logger.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import testRoutes from './routes/testRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import { performanceMiddleware, healthCheckHandler, getMetricsHandler } from './utils/performance.js';
connectDB();

const app = express();
const server = createServer(app);

// Socket.IO setup for real-time features
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Compression middleware
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.", "wss:", "ws:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body parsing with increased limits for file uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  abortOnLimit: true,
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: '/tmp/',
  safeFileNames: true,
  preserveExtension: true
}));

// Logging with different levels
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    },
    skip: (req, res) => res.statusCode < 400
  }));
} else {
  app.use(morgan('dev', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

// Rate limiting
app.use('/api', apiLimiter);

// Auth specific rate limiting
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Static file serving with cache headers and CORS
app.use('/uploads', express.static('uploads', {
  maxAge: '1d',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
}));

// Serve manifest.json and other PWA files with CORS
app.use('/manifest.json', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Content-Type', 'application/manifest+json');
  next();
});

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.json')) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Content-Type', 'application/json');
    }
  }
}));

// Performance monitoring middleware
app.use(performanceMiddleware);

// Health check with detailed info
app.get('/api/health', healthCheckHandler);

// Performance metrics (admin only)
app.get('/api/metrics', getMetricsHandler);

// API documentation
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Paari Senthamizh Kalvi API',
    version: '2.0.0',
    description: 'Modern API for Tamil education platform with real-time features',
    features: [
      'JWT Authentication',
      'Role-based Access Control',
      'Rate Limiting',
      'Caching',
      'File Upload',
      'Real-time Notifications',
      'Compression',
      'Input Validation'
    ],
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        refresh: 'POST /api/auth/refresh',
        profile: 'GET /api/auth/profile',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password'
      },
      courses: {
        getCourses: 'GET /api/courses',
        createCourse: 'POST /api/courses',
        getCourse: 'GET /api/courses/:id',
        updateCourse: 'PUT /api/courses/:id',
        deleteCourse: 'DELETE /api/courses/:id',
        enroll: 'POST /api/courses/:id/enroll'
      },
      videos: {
        getVideos: 'GET /api/videos',
        createVideo: 'POST /api/videos',
        getVideo: 'GET /api/videos/:id',
        updateVideo: 'PUT /api/videos/:id',
        deleteVideo: 'DELETE /api/videos/:id',
        stream: 'GET /api/videos/:id/stream'
      },
      materials: {
        getMaterials: 'GET /api/materials',
        createMaterial: 'POST /api/materials',
        getMaterial: 'GET /api/materials/:id',
        updateMaterial: 'PUT /api/materials/:id',
        deleteMaterial: 'DELETE /api/materials/:id',
        download: 'GET /api/materials/:id/download'
      },
      tests: {
        getTests: 'GET /api/tests',
        createTest: 'POST /api/tests',
        getTest: 'GET /api/tests/:id',
        updateTest: 'PUT /api/tests/:id',
        deleteTest: 'DELETE /api/tests/:id',
        submit: 'POST /api/tests/:id/submit',
        results: 'GET /api/tests/:id/results'
      },
      admin: {
        getUsers: 'GET /api/admin/users',
        getStats: 'GET /api/admin/stats',
        updateUser: 'PUT /api/admin/users/:id',
        deleteUser: 'DELETE /api/admin/users/:id'
      },
      realtime: {
        connect: 'WebSocket connection for real-time features',
        events: ['notification', 'test_update', 'course_progress', 'live_session']
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
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  // Join user-specific room
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    logger.info(`User ${userId} joined their room`);
  });

  // Join course room for real-time updates
  socket.on('join_course', (courseId) => {
    socket.join(`course_${courseId}`);
  });

  // Handle test submissions
  socket.on('test_submit', (data) => {
    // Broadcast to admin room
    io.to('admin_room').emit('test_submitted', data);
  });

  // Handle live sessions
  socket.on('join_live_session', (sessionId) => {
    socket.join(`session_${sessionId}`);
  });

  socket.on('live_message', (data) => {
    io.to(`session_${data.sessionId}`).emit('live_message', {
      ...data,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Global notification function
export const sendNotification = (userId, event, data) => {
  io.to(`user_${userId}`).emit(event, data);
};

export const broadcastToCourse = (courseId, event, data) => {
  io.to(`course_${courseId}`).emit(event, data);
};

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

server.listen(PORT, () => {
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
