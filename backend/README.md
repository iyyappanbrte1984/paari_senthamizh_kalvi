# Paari Senthamizh Kalvi - Backend

Express.js backend for the Tamil education platform with MongoDB.

## Features

- User authentication and authorization
- Course management
- Video content management with file uploads
- Study materials management
- Test/Quiz system
- Admin dashboard
- Email notifications
- Comprehensive logging
- Input validation
- Rate limiting and security

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: express-validator
- **File Upload**: Multer
- **Email**: Nodemailer
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate limiting

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secure secret for JWT tokens
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`: Email configuration

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Seed database (optional):**
   ```bash
   npm run seed
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Courses
- `GET /api/courses` - Get all courses (with pagination/search)
- `POST /api/courses` - Create course (admin only)
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos` - Upload video (admin only)
- `GET /api/videos/:id` - Get video by ID
- `PUT /api/videos/:id` - Update video (admin only)
- `DELETE /api/videos/:id` - Delete video (admin only)

### Materials
- `GET /api/materials` - Get all materials
- `POST /api/materials` - Upload material (admin only)
- `GET /api/materials/:id` - Get material by ID
- `PUT /api/materials/:id` - Update material (admin only)
- `DELETE /api/materials/:id` - Delete material (admin only)

### Tests
- `GET /api/tests` - Get all tests
- `POST /api/tests` - Create test (admin only)
- `GET /api/tests/:id` - Get test by ID
- `PUT /api/tests/:id` - Update test (admin only)
- `DELETE /api/tests/:id` - Delete test (admin only)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stats` - Get platform statistics (admin only)

### System
- `GET /api/health` - Health check
- `GET /api/docs` - API documentation

## File Upload

The API supports file uploads for videos and materials:

- **Videos**: MP4, AVI, MOV, WMV, FLV, WebM, MKV (max 500MB)
- **Materials**: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, ZIP, RAR (max 50MB)

Files are stored in the `uploads/` directory.

## Validation

All endpoints use comprehensive input validation with express-validator. Invalid requests return detailed error messages.

## Security

- JWT authentication with role-based access control
- Password hashing with bcrypt
- Rate limiting (300 requests per 15 minutes)
- Helmet for security headers
- CORS configuration
- Input sanitization and validation

## Logging

Application logs are written to:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs
- Console (development only)

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and error messages.

## Development

- Uses nodemon for auto-restart during development
- ES modules for modern JavaScript
- Structured logging with Winston
- Graceful shutdown handling