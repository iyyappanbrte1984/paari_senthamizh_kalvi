import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', form);
    setMessage('Registration successful. Please login.');
    setTimeout(() => navigate('/login'), 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-2xl p-6">
        <h2 className="mb-4 text-2xl font-bold">Student Register</h2>
        {message && <p className="mb-2 text-green-700">{message}</p>}
        {['name', 'email', 'phone', 'password'].map((f) => (
          <input key={f} type={f === 'password' ? 'password' : 'text'} className="mb-3 w-full rounded-xl border p-3" placeholder={f} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
        ))}
        <button className="w-full rounded-xl bg-secondary p-3 text-white">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
