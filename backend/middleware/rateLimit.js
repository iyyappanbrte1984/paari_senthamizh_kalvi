import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';

// Create Redis client for distributed rate limiting (optional)
const redisClient = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Use Redis store if available
  ...(redisClient && {
    store: new rateLimit.RateLimitRedis({
      sendCommand: (...args) => redisClient.call(...args),
    }),
  }),
});

// Strict limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
});

// File upload limiter
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 uploads per hour
  message: {
    success: false,
    message: 'Upload limit exceeded, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// API endpoint specific limiters
export const createLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: {
    success: false,
    message,
    retryAfter: `${windowMs / 60000} minutes`
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Test submission limiter
export const testSubmissionLimiter = createLimiter(
  30 * 60 * 1000, // 30 minutes
  3, // 3 submissions per 30 minutes
  'Too many test submissions, please wait before trying again.'
);

// Course creation limiter (for admins)
export const courseCreationLimiter = createLimiter(
  60 * 60 * 1000, // 1 hour
  5, // 5 courses per hour
  'Course creation limit exceeded, please try again later.'
);

// Dynamic rate limiter based on user role
export const dynamicLimiter = (req, res, next) => {
  const user = req.user;
  let limiter;

  if (!user) {
    // Unauthenticated users get stricter limits
    limiter = createLimiter(15 * 60 * 1000, 50, 'Rate limit exceeded');
  } else if (user.role === 'admin') {
    // Admins get more generous limits
    limiter = createLimiter(15 * 60 * 1000, 500, 'Rate limit exceeded');
  } else {
    // Regular users get standard limits
    limiter = createLimiter(15 * 60 * 1000, 200, 'Rate limit exceeded');
  }

  return limiter(req, res, next);
};