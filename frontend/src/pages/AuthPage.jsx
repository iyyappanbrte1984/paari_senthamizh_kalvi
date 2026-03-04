import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const { mode } = useParams();
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? form : { email: form.email, password: form.password };
      const { data } = await api.post(url, payload);
      login(data);
      navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Student Register' : 'Student Login'}</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        {isRegister && <input className="w-full border rounded p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />}
        <input className="w-full border rounded p-2" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        {isRegister && <input className="w-full border rounded p-2" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} required />}
        <input className="w-full border rounded p-2" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-primary text-white rounded p-2">{isRegister ? 'Create Account' : 'Login'}</button>
      </form>
    </div>
  );
};

export default AuthPage;
