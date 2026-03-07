import Redis from 'ioredis';
import crypto from 'crypto';

// Redis client for caching
const redisClient = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

// In-memory cache fallback
const memoryCache = new Map();

// Cache durations
const CACHE_DURATIONS = {
  SHORT: 300,    // 5 minutes
  MEDIUM: 1800,  // 30 minutes
  LONG: 3600,    // 1 hour
  EXTRA_LONG: 86400, // 24 hours
};

// Generate cache key from request
const generateCacheKey = (req) => {
  const keyData = {
    url: req.originalUrl,
    userId: req.user?.id || 'anonymous',
    query: req.query,
    body: req.method === 'GET' ? null : req.body,
  };

  return crypto.createHash('md5')
    .update(JSON.stringify(keyData))
    .digest('hex');
};

// Cache middleware
export const cache = (duration = CACHE_DURATIONS.MEDIUM) => {
  return async (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Skip caching for authenticated requests with sensitive data
    if (req.headers.authorization && req.path.includes('/admin')) {
      return next();
    }

    const key = generateCacheKey(req);

    try {
      let cachedData;

      if (redisClient) {
        cachedData = await redisClient.get(key);
        if (cachedData) {
          cachedData = JSON.parse(cachedData);
        }
      } else {
        cachedData = memoryCache.get(key);
      }

      if (cachedData) {
        // Check if cache is still valid
        if (Date.now() - cachedData.timestamp < duration * 1000) {
          return res.json({
            ...cachedData.data,
            cached: true,
            cacheAge: Math.floor((Date.now() - cachedData.timestamp) / 1000)
          });
        } else {
          // Remove expired cache
          if (redisClient) {
            await redisClient.del(key);
          } else {
            memoryCache.delete(key);
          }
        }
      }

      // Store original json method
      const originalJson = res.json;

      // Override json method to cache response
      res.json = function(data) {
        // Cache the response
        const cacheData = {
          data,
          timestamp: Date.now()
        };

        if (redisClient) {
          redisClient.setex(key, duration, JSON.stringify(cacheData));
        } else {
          memoryCache.set(key, cacheData);
        }

        // Call original json method
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      // If caching fails, continue without caching
      console.warn('Cache error:', error.message);
      next();
    }
  };
};

// Clear cache for specific patterns
export const clearCache = async (pattern) => {
  try {
    if (redisClient) {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
    } else {
      // For in-memory cache, we can't easily clear by pattern
      // This is a limitation of the in-memory fallback
      console.log('In-memory cache clearing not supported for patterns');
    }
  } catch (error) {
    console.warn('Cache clearing error:', error.message);
  }
};

// Cache invalidation middleware
export const invalidateCache = (patterns) => {
  return async (req, res, next) => {
    // Store original json method
    const originalJson = res.json;

    // Override json method to clear cache after successful response
    res.json = async function(data) {
      try {
        // Clear cache patterns
        for (const pattern of patterns) {
          await clearCache(pattern);
        }
      } catch (error) {
        console.warn('Cache invalidation error:', error.message);
      }

      // Call original json method
      return originalJson.call(this, data);
    };

    next();
  };
};

// Cache statistics (for monitoring)
export const getCacheStats = async () => {
  try {
    if (redisClient) {
      const info = await redisClient.info();
      const usedMemory = info.match(/used_memory:(\d+)/)?.[1];
      const connectedClients = info.match(/connected_clients:(\d+)/)?.[1];

      return {
        type: 'redis',
        usedMemory: parseInt(usedMemory) || 0,
        connectedClients: parseInt(connectedClients) || 0,
      };
    } else {
      return {
        type: 'memory',
        entries: memoryCache.size,
        estimatedSize: JSON.stringify([...memoryCache]).length,
      };
    }
  } catch (error) {
    return { error: error.message };
  }
};