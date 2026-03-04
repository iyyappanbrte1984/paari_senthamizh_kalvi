# UG TRB Online Coaching & Test Batch Platform

Full-stack modern web app for Tamil Nadu UG TRB aspirants.

## Stack
- Frontend: React (Vite), TailwindCSS, React Router, Axios, Chart.js, Framer Motion
- Backend: Node.js, Express.js
- Database: MongoDB Atlas (Mongoose)
- Auth: JWT + role-based access (Student/Admin)
- Deployment ready: Vercel (frontend), Render (backend)

## Features
- Bilingual toggle (Tamil / English)
- Student authentication and dashboards
- Admin analytics dashboard with charts
- Course, test, materials, videos, payments API structure
- Daily practice tests, leaderboard-ready results, difficulty levels
- TRB syllabus and previous year question bank sections
- Rate limiting, CORS, validation, bcrypt password hashing
- PWA-ready manifest scaffold

## Run locally
```bash
npm install
cp backend/.env.example backend/.env
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## API Routes
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET/POST `/api/courses`
- GET/POST `/api/tests`
- GET `/api/tests/:id`
- POST `/api/tests/submit`
- GET/POST `/api/materials`
- GET/POST `/api/videos`
- GET `/api/admin/dashboard`
