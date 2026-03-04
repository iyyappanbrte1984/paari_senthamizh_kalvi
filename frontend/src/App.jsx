import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CoursesPage from './pages/CoursesPage';
import TestsPage from './pages/TestsPage';
import MaterialsPage from './pages/MaterialsPage';
import StudentDashboard from './dashboard/StudentDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';

const App = () => {
  const [lang, setLang] = useState('en');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 mt-3 flex justify-end">
        <button className="text-xs px-2 py-1 border rounded" onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}>
          {lang === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/auth/login" />} />
          <Route path="/register" element={<Navigate to="/auth/register" />} />
          <Route path="/auth/:mode" element={<AuthPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
