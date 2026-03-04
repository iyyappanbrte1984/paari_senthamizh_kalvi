# UG TRB Online Coaching & Test Batch Platform

Full-stack web app for Tamil Nadu UG TRB coaching institute.

## Tech Stack
- **Frontend:** React (Vite), TailwindCSS, React Router, Axios, Chart.js, Framer Motion
- **Backend:** Node.js, Express, MongoDB Atlas, JWT auth, role-based access

## Features
- Student/Admin authentication with JWT
- Home page with modern UI and Tamil/English toggle
- Student dashboard with analytics charts
- Admin dashboard with platform analytics
- Online mock test system with timer and instant score/rank
- Study materials and recorded video modules
- Previous year question bank + TRB syllabus highlights
- Payment module structure (Razorpay-ready model)
- Security middleware: Helmet, CORS, rate limiting, validation

## Folder Structure
- `frontend/src/components`
- `frontend/src/pages`
- `frontend/src/dashboard`
- `frontend/src/services`
- `frontend/src/hooks`
- `backend/controllers`
- `backend/models`
- `backend/routes`
- `backend/middleware`
- `backend/config`

## Run locally
```bash
npm install
cp backend/.env.example backend/.env
# add Mongo URI + JWT secret
npm run dev
```

## Seed sample data
```bash
npm run seed --workspace backend
```

## Deployment
- Frontend: Vercel (`frontend`)
- Backend: Render (`backend`)
