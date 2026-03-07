import os from 'os';
import { performance } from 'perf_hooks';
import logger from './logger.js';

// Performance monitoring class
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      responseTime: [],
      memoryUsage: [],
      cpuUsage: [],
      errors: 0
    };

    this.startTime = performance.now();
    this.lastReset = Date.now();

    // Collect metrics every 30 seconds
    setInterval(() => this.collectMetrics(), 30000);
  }

  // Middleware to track request performance
  trackRequest(req, res, next) {
    const start = performance.now();

    res.on('finish', () => {
      const duration = performance.now() - start;
      this.metrics.requests++;
      this.metrics.responseTime.push(duration);

      // Keep only last 1000 measurements
      if (this.metrics.responseTime.length > 1000) {
        this.metrics.responseTime.shift();
      }

      // Log slow requests
      if (duration > 1000) { // More than 1 second
        logger.warn(`Slow request: ${req.method} ${req.path} - ${duration.toFixed(2)}ms`);
      }
    });

    next();
  }

  // Track errors
  trackError(error, req = null) {
    this.metrics.errors++;

    if (req) {
      logger.error(`Request error: ${req.method} ${req.path} - ${error.message}`);
    } else {
      logger.error(`Application error: ${error.message}`);
    }
  }

  // Collect system metrics
  collectMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    this.metrics.memoryUsage.push({
      rss: memUsage.rss,
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      timestamp: Date.now()
    });

    this.metrics.cpuUsage.push({
      user: cpuUsage.user,
      system: cpuUsage.system,
      timestamp: Date.now()
    });

    // Keep only last 100 measurements
    if (this.metrics.memoryUsage.length > 100) {
      this.metrics.memoryUsage.shift();
    }
    if (this.metrics.cpuUsage.length > 100) {
      this.metrics.cpuUsage.shift();
    }
  }

  // Get current metrics
  getMetrics() {
    const uptime = performance.now() - this.startTime;
    const avgResponseTime = this.metrics.responseTime.length > 0
      ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length
      : 0;

    const latestMemory = this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1];
    const latestCpu = this.metrics.cpuUsage[this.metrics.cpuUsage.length - 1];

    return {
      uptime: Math.floor(uptime / 1000), // seconds
      requests: this.metrics.requests,
      averageResponseTime: Math.round(avgResponseTime * 100) / 100,
      errors: this.metrics.errors,
      memoryUsage: latestMemory ? {
        rss: Math.round(latestMemory.rss / 1024 / 1024), // MB
        heapUsed: Math.round(latestMemory.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(latestMemory.heapTotal / 1024 / 1024), // MB
      } : null,
      cpuUsage: latestCpu ? {
        user: Math.round(latestCpu.user / 1000), // milliseconds
        system: Math.round(latestCpu.system / 1000), // milliseconds
      } : null,
      systemInfo: {
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024), // GB
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024), // GB
      }
    };
  }

  // Reset metrics
  resetMetrics() {
    this.metrics = {
      requests: 0,
      responseTime: [],
      memoryUsage: [],
      cpuUsage: [],
      errors: 0
    };
    this.lastReset = Date.now();
    logger.info('Performance metrics reset');
  }

  // Health check
  getHealthStatus() {
    const metrics = this.getMetrics();
    const isHealthy = metrics.errors < 10 && metrics.averageResponseTime < 2000;

    return {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      metrics,
      checks: {
        responseTime: metrics.averageResponseTime < 2000 ? 'pass' : 'fail',
        errorRate: metrics.errors < 10 ? 'pass' : 'fail',
        memoryUsage: metrics.memoryUsage?.heapUsed < 500 ? 'pass' : 'warn', // Less than 500MB
      }
    };
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;

// Express middleware for tracking requests
export const performanceMiddleware = performanceMonitor.trackRequest.bind(performanceMonitor);

// Error tracking function
export const trackError = performanceMonitor.trackError.bind(performanceMonitor);

// Get metrics endpoint handler
export const getMetricsHandler = (req, res) => {
  res.json(performanceMonitor.getMetrics());
};

// Health check endpoint handler
export const healthCheckHandler = (req, res) => {
  const health = performanceMonitor.getHealthStatus();
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
};