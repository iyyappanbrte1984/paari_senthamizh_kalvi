# பாரி செந்தமிழ்க் கல்வி - UG TRB Online Coaching Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)](https://www.mongodb.com/)

A cutting-edge, full-stack web application for Tamil Nadu's premier UG TRB coaching institute, built with modern technologies and best practices.

## ✨ Features

### 🎓 Core Features
- **Multi-role Authentication**: JWT-based auth with role-based access control (Student/Admin)
- **Interactive Dashboard**: Real-time analytics with beautiful charts and progress tracking
- **Online Test System**: Advanced mock tests with live timer, auto-submit, and instant results
- **Study Materials**: Comprehensive PDF materials and video lectures
- **Progress Tracking**: Detailed learning analytics and performance insights
- **Real-time Notifications**: WebSocket-powered live updates and notifications

### 🚀 Modern Tech Stack
- **Frontend**: React 18 + Vite, Tailwind CSS, Framer Motion, React Query
- **Backend**: Node.js + Express, MongoDB, Socket.IO, Redis (optional)
- **DevOps**: Docker-ready, PWA support, performance monitoring
- **Security**: Helmet, CORS, rate limiting, input validation, encryption

### 🎨 UI/UX Features
- **Progressive Web App**: Installable PWA with offline capabilities
- **Responsive Design**: Mobile-first approach with ultra-modern UI
- **Dark Mode**: System-aware theme switching
- **Animations**: Smooth micro-interactions and page transitions
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized loading with code splitting and caching

### 🔒 Security & Performance
- **Rate Limiting**: Advanced rate limiting with Redis support
- **Data Validation**: Comprehensive input validation and sanitization
- **File Upload**: Secure file handling with type/size restrictions
- **Caching**: Intelligent caching with Redis and in-memory fallbacks
- **Compression**: Response compression for optimal performance
- **Monitoring**: Real-time performance metrics and health checks

## 📁 Project Structure

```
paari_senthamizh_kalvi/
├── frontend/
│   ├── public/
│   │   ├── manifest.json
│   │   └── sw.js
│   └── src/
│       ├── components/
│       │   ├── LoadingComponents.jsx
│       │   ├── ErrorBoundary.jsx
│       │   ├── Toast.jsx
│       │   └── Modal.jsx
│       ├── providers/
│       │   └── QueryProvider.jsx
│       ├── hooks/
│       │   └── useApi.js
│       ├── pages/
│       ├── dashboard/
│       └── services/
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── rateLimit.js
│   │   └── cache.js
│   ├── utils/
│   │   ├── response.js
│   │   ├── performance.js
│   │   └── logger.js
│   ├── routes/
│   ├── controllers/
│   └── models/
└── docs/
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (optional, for advanced caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iyyappanbrte1984/paari_senthamizh_kalvi.git
   cd paari_senthamizh_kalvi
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Environment Setup**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

4. **Start Development Servers**
   ```bash
   # Root directory - starts both frontend and backend
   npm run dev

   # Or run separately:
   cd frontend && npm run dev
   cd backend && npm start
   ```

5. **Seed Sample Data**
   ```bash
   npm run seed --workspace backend
   ```

## 🔧 Configuration

### Environment Variables

Create `backend/.env` with:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paari_senthamizh_kalvi
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
```

## 📊 API Documentation

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Courses
```http
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
PUT    /api/courses/:id
DELETE /api/courses/:id
```

### Real-time Features
- WebSocket connection for live notifications
- Course progress updates
- Test submission broadcasts
- Live session messaging

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# E2E testing
npm run test:e2e
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
cd backend
npm run build
# Deploy to your preferred platform
```

### Docker
```bash
docker-compose up -d
```

## 📈 Performance Monitoring

Access metrics at:
- Health Check: `GET /api/health`
- Performance Metrics: `GET /api/metrics`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for Tamil Nadu's aspiring teachers
- Special thanks to the open-source community
- Inspired by modern educational platforms

## 📞 Support

For support, email support@paarisenthamizhkalvi.com or join our Discord community.

---

**பாரி செந்தமிழ்க் கல்வி** - Empowering Tamil Nadu's Future Teachers 🎓✨
