// Standard API response format
export const createResponse = (success, message, data = null, meta = null) => {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta) {
    response.meta = meta;
  }

  return response;
};

// Success responses
export const successResponse = (message, data = null, meta = null) => {
  return createResponse(true, message, data, meta);
};

export const createdResponse = (message, data = null) => {
  return successResponse(message, data);
};

export const updatedResponse = (message, data = null) => {
  return successResponse(message, data);
};

export const deletedResponse = (message) => {
  return successResponse(message);
};

// Error responses
export const errorResponse = (message, statusCode = 500, errors = null) => {
  const response = createResponse(false, message);

  if (errors) {
    response.errors = errors;
  }

  // Add status code for middleware use
  response.statusCode = statusCode;

  return response;
};

export const validationErrorResponse = (errors) => {
  return errorResponse('Validation failed', 400, errors);
};

export const unauthorizedResponse = (message = 'Unauthorized access') => {
  return errorResponse(message, 401);
};

export const forbiddenResponse = (message = 'Access forbidden') => {
  return errorResponse(message, 403);
};

export const notFoundResponse = (message = 'Resource not found') => {
  return errorResponse(message, 404);
};

export const conflictResponse = (message = 'Resource conflict') => {
  return errorResponse(message, 409);
};

// Pagination helper
export const createPaginationMeta = (page, limit, total, baseUrl, query = {}) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const meta = {
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
    links: {}
  };

  // Build query string for links
  const buildQueryString = (pageNum) => {
    const params = new URLSearchParams({ ...query, page: pageNum, limit });
    return `${baseUrl}?${params.toString()}`;
  };

  if (hasPrev) {
    meta.links.prev = buildQueryString(page - 1);
  }

  if (hasNext) {
    meta.links.next = buildQueryString(page + 1);
  }

  meta.links.first = buildQueryString(1);
  meta.links.last = buildQueryString(totalPages);

  return meta;
};

// Data transformation helpers
export const transformUser = (user) => {
  const { password, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
  return {
    ...userWithoutPassword,
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
};

export const transformCourse = (course) => {
  return {
    ...course.toObject(),
    createdAt: course.createdAt?.toISOString(),
    updatedAt: course.updatedAt?.toISOString(),
    enrollmentCount: course.enrollments?.length || 0,
  };
};

export const transformTest = (test) => {
  const { answers, ...testWithoutAnswers } = test.toObject ? test.toObject() : test;
  return {
    ...testWithoutAnswers,
    questionCount: test.questions?.length || 0,
    createdAt: test.createdAt?.toISOString(),
    updatedAt: test.updatedAt?.toISOString(),
  };
};

// API wrapper for consistent error handling
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error('API Error:', error);

      // Mongoose validation error
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json(validationErrorResponse(errors));
      }

      // Mongoose duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(409).json(conflictResponse(`${field} already exists`));
      }

      // JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json(unauthorizedResponse('Invalid token'));
      }

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json(unauthorizedResponse('Token expired'));
      }

      // Default error response
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';

      res.status(statusCode).json(errorResponse(message, statusCode));
    });
  };
};